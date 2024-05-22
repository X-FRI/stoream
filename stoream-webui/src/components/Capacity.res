open GeistUI

@react.component
let make = (~color: string) => {
  <>
    <Tooltip _type="success" text="Occupied: 15%, remaining: 75%" placement="right">
      <Capacity value={15} limit={100} color={color} width={5} scale={1.5} />
    </Tooltip>
  </>
}
