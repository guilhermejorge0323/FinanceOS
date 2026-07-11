'use client';

import { Container } from "@/components/ui/container";
import { IntroductionHeaderLinks } from "../IntroductionHeaderLinks";
import { HeaderIntroductionButton } from "../PrimaryButton";

export function ResponsiveIntroductionMenu() {
    return (
        <div className='bg-primary-black-introduction/95 fixed w-full border-y border-white/5'>
        <Container className='flex-col gap-3 py-4'>
          <IntroductionHeaderLinks className="py-2 font-semibold" />

          <HeaderIntroductionButton className='flex  justify-center py-2.5'>
            Entrar
          </HeaderIntroductionButton>
        </Container>
      </div>
    )
}
