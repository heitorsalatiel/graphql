import ApolloBoost, {gql} from 'apollo-boost'

const client = new ApolloBoost({
	uri: 'http://localhost:4000/'
});

const getUsers = gql`
	query {
		users{
			id 
			name
			email
		}
	}
`
client.query({
	query: getUsers
}).then((response) => {
	let html = '';

	response.data.users.forEach((user,index) => {
		html += `
			<div>
				<h3>${user.name}</h3>
			</div>
		`	
	});

	document.getElementById('users').innerHTML = html;
});

const getPosts = gql`
	query {
		posts{
			title
			body
			published
			author {
				name
			}
		}
	}
`

client.query({
	query: getPosts
}).then((response) => {
	let html = '';
	response.data.posts.forEach((post,index) => {
		if(post.published) {
			html += `
				<div>
					<h3>${post.title}</h3>
					<p>Author: ${post.author.name}</p>
					<p>${post.body}</p>
				</div>
			`	
		}
	});

	document.getElementById('posts').innerHTML = html;
});