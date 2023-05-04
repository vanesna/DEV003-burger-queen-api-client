export default function Product(props) {
  return (
    <div>
      {/* {props.product.qty} */}
      {props.product.name} - {props.product.price}
    </div>
  );
}
