import React, { Component } from "react";
import axios from "axios";

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        axios
        .get("/api/post")
        .then((res) => this.setState({posts: res.data}))
        .catch((err) => console.log(err))
    }


    post = () => {
        
        function addtocart(pk)
        {
            axios.get('api/addtocart/'+pk)
        }

        function HashTags(props)
        {
            return(
                props.item.hashtags.map((hashtag)=>(
                    <a href="http://localhost:3000/posts" class="btn">#{hashtag}</a>
                ))
            )
        }

        const postcontent = this.state.posts.map((item) => (
        <main className="container">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                    <div className="mb-4">
                        <ul key={item.id} className="list-group list-group-flush border-top-0">
                            {item.price}
                            {item.desc} 
                            <HashTags item={item} />
                            <button onClick={() => addtocart(item.pk)} class="btn">add to cart</button>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        ))
        return(
            postcontent
        );
    };

    render() {
        return (
            <main>
            {this.post()}
            </main>
        );
    }
}

export default Posts;