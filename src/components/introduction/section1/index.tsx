import { Container } from '@/components/ui/container';
import { AreaTextsS1 } from './AreaTextsS1';
import { AreaImageS1 } from './AreaImageS1';

export function Section1() {
  return (
    <section className='mt-36 mb-20'>
      <Container className='flex-col'>
        <AreaTextsS1 />

        <AreaImageS1 />
      </Container>
    </section>
  );
}
