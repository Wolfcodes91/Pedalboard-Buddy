import './PhotoCard.css';

export default function PhotoCard({ photo }) {
  return (
    <article className="PhotoCard">
      <img src={photo.url} />
    </article>
  );
}