export default function FlipDigit({ digit = "0", sizePx = 128 }) {
  const [curr, setCurr] = useState(String(digit));
  const [prev, setPrev] = useState(String(digit));
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const d = String(digit);
    if (d !== curr) {
      setPrev(curr);
      setCurr(d);
      setAnim(true);
      const to = setTimeout(() => setAnim(false), 700);
      return () => clearTimeout(to);
    }
  }, [digit, curr]);

  return (
    <div className="flip-digit" style={{ "--fontPx": `${sizePx}px` }}>
      {/* base halves (atrás) */}
      <div className="slice top"><span className="num">{curr}</span></div>
      <div className="slice bottom"><span className="num">{curr}</span></div>

      {/* frentes animadas */}
      <div className={`flip topFlip ${anim ? "animate" : ""}`}>
        <span className="num">{prev}</span>
        <div className="shine top" />
      </div>
      <div className={`flip bottomFlip ${anim ? "animate" : ""}`}>
        <span className="num">{curr}</span>
        <div className="shine bottom" />
      </div>
    </div>
  );
}
