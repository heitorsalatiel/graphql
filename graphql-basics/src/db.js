const users = [
    {
        id: '1',
        name: 'Heitor',
        email: 'heitor@gmail.com',
        age: '29'
    },
    {
        id: '2',
        name: 'Lais',
        email: 'lais@gmail.com',
        age: '30'
    },
    {
        id: '3',
        name: 'Arthur',
        email: 'arthur@gmail.com',
        age: '27'
    }
];

const posts = [
    {
        id: '1',
        title: 'A arte de ser feliz',
        body: 'Vem ser feliz programando',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'Viajando o mundo',
        body: 'Vamos viajar o mundo todo',
        published: false,
        author: '2'
    },
    {
        id: '3',
        title: 'Cozinhando como profissional',
        body: 'A comida esta muito boa',
        published: true,
        author: '3'
    }
]

const comments = [
    {
        id:'1',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        author:'1',
        post:'1'
    },
    {
        id:'2',
        text:'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of constraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        author:'2',
        post:'2'
    },
    {
        id:'3',
        text:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        author:'3',
        post:'3'
    },
    {
        id:'4',
        text:'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        author:'1',
        post:'3'
    }
]

const db = {
    users,
    posts,
    comments
}

export default db;