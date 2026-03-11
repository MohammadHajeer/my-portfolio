export default function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-cyan-500 dark:text-cyan-400 text-xs tracking-widest uppercase mb-4 font-dm-mono">
      &#47;&#47; {text}
    </p>
  );
}
