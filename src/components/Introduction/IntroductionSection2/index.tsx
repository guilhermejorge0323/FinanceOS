import { AreaTitleS2 } from './AreaTitleS2';
import { AreaCardS2 } from './AreaCardsS2';

export function IntroductionSection2() {
  return (
    <section id='resources' className='bg-primary-black-introduction py-24 relative z-2 gap-4'>
      <AreaTitleS2 />

      <AreaCardS2 />
    </section>
  );
}
