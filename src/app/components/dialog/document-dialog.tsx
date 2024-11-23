"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { FileUp, Plus } from "@/app/assets";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertCircle, ArrowRight, FileUpIcon, PlusIcon, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import PDFViewer from "../visualizer/pdf-viewer"
import { MAX_FILE_SIZE, documentForm, DocumentFormTypes } from "./schema"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function DocumentDialog() {
	const [open, setOpen] = React.useState(false)
	const [pdfViewerOpen, setPdfViewerOpen] = React.useState(false)
	const [uploading, setUploading] = React.useState(false)
	const [progress, setProgress] = React.useState(0)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const isMobile = useIsMobile()

	const form = useForm<DocumentFormTypes>({
		resolver: zodResolver(documentForm),
		defaultValues: {
			origin: "",
			type: "",
		},
	})

	const selectedFile = form.watch("file")

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
	}

	const uploadFile = (file: File) => {
		setUploading(true)
		setProgress(0)
		form.clearErrors("file")

		const xhr = new XMLHttpRequest()
		const formData = new FormData()
		formData.append('file', file)

		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentComplete = (event.loaded / event.total) * 100
				setProgress(percentComplete)
			}
		}

		xhr.onload = () => {
			if (xhr.status === 200) {
				console.log('File uploaded successfully')
			} else {
				form.setError("file", { message: 'Falha no upload do arquivo. Por favor, tente novamente.' })
			}
			setUploading(false)
		}

		xhr.onerror = () => {
			form.setError("file", { message: 'Falha no upload do arquivo. Por favor, tente novamente.' })
			setUploading(false)
		}

		// Replace with your actual upload URL
		xhr.open('POST', '/api/upload', true)
		xhr.send(formData)
	}

	const handleFile = (file: File) => {
		if (file) {
			console.log(file.size)
			if (file.size > MAX_FILE_SIZE) {
				form.setError('file', { type: 'custom', message: "O arquivo deve ter no máximo 10MB" })
			} else {
				form.setValue("file", file, { shouldValidate: true })
				/* TODO: Remover comentário assim que finalizar função de upload */
				// uploadFile(file)
				simulateUpload(file)
			}
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileFromInput = e.target.files?.[0]
		if (fileFromInput) {
			handleFile(fileFromInput)
		}
	}

	const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const droppedFile = e.dataTransfer.files[0]
		if (droppedFile) {
			handleFile(droppedFile)
		}
	}, [form])

	const onDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}, [])

	const simulateUpload = (file: File) => {
		setUploading(true)
		setProgress(0)

		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 100) {
					clearInterval(interval)
					setUploading(false)
					return 100
				}
				return prevProgress + 10
			})
		}, 500)
	}


	const removeFile = () => {
		form.setValue("file", undefined)
		setUploading(false)
		setProgress(0)
	}

	const handleCloseDialog = () => {
		setOpen(!open)
		form.reset();
		removeFile()
	}

	const openPdfViewer = () => {
		setPdfViewerOpen((prevState) => !prevState)
	}

	const onSubmit = (data: DocumentFormTypes) => {
		console.log(data)
		if (data.file) {
			uploadFile(data.file)
		}
	}

	const isButtonDisabled = () => {
		const fields = ['file', 'type', 'origin'];

		const hasErrors = (fields: string[]) => fields.some(field => field in form.formState.errors);
		const isFormDirty = (fields: string[]) => fields.every(field => field in form.formState.dirtyFields);

		console.log(form.formState.dirtyFields, isFormDirty(fields), hasErrors(fields), uploading, form.formState.isSubmitting)

		return !isFormDirty(fields) || hasErrors(fields) || uploading || form.formState.isSubmitting;
	}

	return (
		<>
			<Dialog open={open} onOpenChange={handleCloseDialog}>
				<DialogTrigger asChild>
					{!isMobile
						? <Button className="hidden lg:inline-flex">
							<PlusIcon size="16" color="#FFFFFF" />
							Novo documento
						</Button>
						: <Button
							className="absolute z-30 flex justify-center items-center rounded-full lg:hidden size-14 bottom-40 right-4">
							<PlusIcon size="24" color="#FFFFFF" />
						</Button>
					}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[700px] max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Criar novo documento</DialogTitle>
						<DialogDescription>Insira os dados necessários para criar</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
								0000
							</div>
							<FormField
								control={form.control}
								name="origin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Origem do documento</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecionar a origem do documento" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="option1">Opção 1</SelectItem>
												<SelectItem value="option2">Opção 2</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo do documento</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecionar tipo do documento" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="option1">Opção 1</SelectItem>
												<SelectItem value="option2">Opção 2</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{selectedFile && !uploading && !form.formState.errors.file
								? <></>
								: <FormField
									control={form.control}
									name="file"
									render={({ field: { value, onChange, ...field } }) => (
										<FormItem>
											<FormLabel>Arquivo</FormLabel>
											<FormControl>
												<div
													onDrop={onDrop}
													onDragOver={onDragOver}
													onClick={() => fileInputRef.current?.click()}
													className={
														cn(
															`
																border-2
																border-dashed
																border-primary
																rounded-lg
																p-6
																text-center
																cursor-pointer
																hover:bg-primary/50
																transition-colors
															`,
															{ "pointer-events-none": uploading },
															{ "border-destructive bg-destructive/50": !!form.formState.errors.file }
														)}
												>
													<input
														type="file"
														id="file-upload"
														className="hidden"
														accept=".pdf"
														disabled={uploading}
														// ref={fileInputRef}
														onChange={(e) => {
															handleFileChange(e);
															onChange(e.target.files?.[0])
														}}
														{...{
															...field,
															ref: fileInputRef
														}}
													/>
													<label
														htmlFor="file-upload"
														className="
															cursor-pointer
															inline-flex
															flex-col
															justify-center
															items-center
															gap-2
														"
													>
														<FileUp size="32" color={!!form.formState.errors.file ? "#ef4444" : undefined} />
														<div className="text-sm text-muted-foreground">
															{selectedFile && !uploading ? (
																<span className={cn({ 'text-destructive': !!form.formState.errors.file })}>{selectedFile.name}</span>
															) : (
																<>
																	<p>Arraste e solte aqui ou selecione o arquivo para upload</p>
																	<p className="mt-2">
																		<Button
																			disabled={uploading}
																			variant="outline"
																			className="h-auto font-semibold text-neutral-900"
																			onClick={() => fileInputRef.current?.click()}
																		>
																			Procurar e selecionar arquivo
																		</Button>
																	</p>
																	<p
																		className={cn(`
																				text-xs
																				mt-2
																			`,
																			{ "text-destructive": !!form.formState.errors.file }
																		)}
																	>
																		{!!form.formState.errors.file ? `Arquivo não suportado` : `Tamanho máx.: 10MB`}
																	</p>
																</>
															)}
														</div>
													</label>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							}
							{!!form.formState.errors.file
								? <Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Erro</AlertTitle>
									<AlertDescription>{form.formState.errors.file.message}</AlertDescription>
								</Alert>
								: <></>
							}
							{selectedFile && !form.formState.errors.file
								? (
									<>
										<Card>
											<CardContent className="p-4">
												<div className="flex items-center space-x-4">
													<FileUpIcon
														className={cn(
															`w-8 h-8 text-muted-foreground`,
															{ 'text-primary': !!selectedFile && !uploading && !form.formState.errors.file }
														)}
													/>
													<div className="flex-1 space-y-1">
														<p className="text-sm font-medium">{form.watch("file")?.name}</p>
														<p className="text-xs text-muted-foreground">{formatFileSize(form.watch("file")?.size || 0)}</p>
													</div>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
														onClick={removeFile}
													>
														<X className="h-4 w-4" />
														<span className="sr-only">Remove file</span>
													</Button>
												</div>
												{uploading && (
													<>
														<Progress value={progress} className="w-full mt-4" />
														<p className="text-xs text-right mt-1">{progress.toFixed(0)}%</p>
													</>
												)}
											</CardContent>
										</Card>
										<div className="flex justify-start">
											<Button
												variant="link"
												disabled={uploading || !selectedFile}
												onClick={(e) => {
													e.preventDefault();
													openPdfViewer();
												}}
												className="text-primary"
											>
												Pré-visualizar
											</Button>
										</div>
									</>
								)
								: <></>
							}
							<DialogFooter className="gap-2">
								<Button variant="outline" onClick={() => setOpen(false)}>
									Cancelar
								</Button>
								<Button
									type="submit"
									disabled={isButtonDisabled()}
									className="flex items-center justify-center text-white"
								>
									Criar documento
									<ArrowRight />
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
			{!!selectedFile &&
				<PDFViewer
					file={selectedFile}
					open={pdfViewerOpen}
					onOpenChange={openPdfViewer}
				/>}
		</>
	)
}
