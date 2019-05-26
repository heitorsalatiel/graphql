import {gql} from 'apollo-boost';

const createUser = gql`
    mutation($data:CreateUser!) {
        createUser(
            data: $data
        ){
            token,
            user{
                id
                name
                email
            }
        }
    }
`

const getUsers = gql`
    query{
        users{
            id
            name
            email
        }
    }
`

const getProfile = gql`
    query {
        me{
            id
            name
            email
        }
    }
`

const getPosts = gql`
	query{
		posts{
			id
			title
			body
			published
		}
	}
`

const myPost = gql`
	query {
		myPosts{
			title
			body
			published
			author{
				id
			}
		}
	}
`;

const createPost = gql`
	mutation($data:CreatePostInput!) {
		createPost(
			data: $data
		){
			title
			body
			published
		}
	}
`;

const deletePost = gql`
	mutation($id:ID!) {
		deletePost (
			id:$id
		){
			id
		}
	}
`;

const updatePost = gql`
	mutation($data:UpdatePostInput!, $id:ID!) {
		updatePost(
			id: $id,
			data: $data
		){
			id
			title
			body
			published
		}
	}
`;

const  deleteComment = gql`
	mutation($id:ID!) {
		deleteComment(
			id:$id
		){
			id
		}
	}
`;

const subscribeToComments = gql`
	subscription($postId:ID!) {
		comment(postId:$postId){
			mutation
			node{
				id
				text
			}
		}
	}
`;

const subscribeToPosts = gql`
	subscription{
		post {
			mutation
		}
	}
`

export {createUser, getProfile, getUsers, getPosts, myPost,createPost, updatePost,deletePost, deleteComment, subscribeToComments,subscribeToPosts}