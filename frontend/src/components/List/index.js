/**
 * Generic list component for displaying list of other components
 */

export default function List(props) {
  return (
    <div className="list">
      {props.children}
    </div>
  );
}