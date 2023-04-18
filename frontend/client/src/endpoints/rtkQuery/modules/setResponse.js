const setResponse = ({arg, response}) => {

    for (let i in response.nested_data.data) {
        const page = arg.page;
        const post = response.nested_data.data[i];
        post.page = page;
    }
    
}

export default setResponse