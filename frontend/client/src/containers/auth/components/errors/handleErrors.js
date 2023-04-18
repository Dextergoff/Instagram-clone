
const handleErrors = ({response, rejected}) => {

    const parseErrors = (response) => {
      const errors = []
        try {
          for (let i in response){
            errors.push(<div className="text-danger text-center">{response[i]}</div>)
          }
        return errors[0]
          } catch (unexpected_error) {
            return rejected
          }
      }

    return(
        parseErrors(response)
    )

}
export default handleErrors