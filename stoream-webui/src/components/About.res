open GeistUI

@react.component
let make = () => {
  <>
    <Card width="20%">
      <Text h4=true my=0> {"Stoream WebUI"->React.string} </Text>
      <Text h4=false my=0> {"极简主义者的网盘系统"->React.string} </Text>
      <Card.Footer>
        <Link
          icon=true block=true underline=true color=true href="https://github.com/x-fri/stoream">
          {"Visit source code on GitHub."->React.string}
        </Link>
      </Card.Footer>
    </Card>
  </>
}
