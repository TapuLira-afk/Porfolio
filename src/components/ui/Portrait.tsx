import photoUrl from "../../assets/foto.webp";

export default function Portrait({ label = "Retrato de Lira" }: { label?: string }) {
  return (
    <div className="portrait">
      <img src={photoUrl} alt={label} />
    </div>
  );
}
