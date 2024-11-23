import { EPaperFooterGrayScale } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

export default function Footer() {

  return (
    <footer
      className='
        mt-6
        h-[4.5rem]
				container
				flex
				justify-center
				items-center
				gap-6
        absolute
        w-full
        bottom-0
      '
    >
      <Image
        src={EPaperFooterGrayScale}
        alt="Icone e-paper em escala de cinza"
        width={124}
        height={40}
      />
      <p
        className='text-[#6b7280]'
      >
        Copyright &copy;{new Date().getFullYear()} e-paper
      </p>
    </footer>
  )
}
