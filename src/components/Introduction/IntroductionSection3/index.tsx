import { AreaCardS3 } from './AreaCardS3';
import { AreaTitleS3 } from './AreaTitleS3';

export function IntroductionSection3() {
  return (
    <section
      id='how-it-works'
      className='py-24 relative z-2 gap-4 border-t border-white/5'
    >
      <AreaTitleS3 />

      <AreaCardS3 />
    </section>
  );
}
