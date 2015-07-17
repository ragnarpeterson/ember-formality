export default function cancelEvent(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}
