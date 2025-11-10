import Section from '../../../components/AppSection/AppSection';

export default function About() {
  const counter = new Array(5).fill(null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5">
      {counter.map((_, i) => (
        <Section
          title="About Us"
          className={i % 2 == 0 ? '' : 'bg-light text-dark'}
          key={'section' + i}
        >
          <p>This is a About.</p>
        </Section>
      ))}
    </main>
  );
}
