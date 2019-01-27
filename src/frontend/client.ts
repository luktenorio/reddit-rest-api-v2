//register
(async () => {
    const data ={
        email: "talita.brizolla@live.com",
        password: "teste1"
    }
    const response = await fetch(
        "http://localhost:8080/api/v1/users/",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();


//link
(async () => {
    const data ={
        url: "school_condemns_trumpsupporting_students_who",
        title:"School condemns Trump-supporting students who harassed Native American"
    }
    const response = await fetch(
        "http://localhost:8080/api/v1/links/",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4MjU2MDQ3fQ.HYS8ta2YJkzjfxdH08hSbxXGa3jbp52sYWyGg_DTnbo"
        
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();


//auth
(async () => {
    const data ={
        email: "talita.brizolla@live.com",
        password: "teste1"
    }
    const response = await fetch(
        "http://localhost:8080/api/v1/auth/login/",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();


//comment
(async () => {
    const data ={

        linkId: 2,
        textfiel: "teste"
    }
    const response = await fetch(
        "http://localhost:8080/api/v1/comments/",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                 "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
        
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

// delete link
(async () => {

    const response = await fetch(
        "http://localhost:8080/api/v1/links/1",
        {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                 "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
        
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();


// upvote
(async () => {

    const response = await fetch(
        "http://localhost:8080/api/v1/links/1/upvote",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                 "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
        
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();

// downvote
(async () => {

    const response = await fetch(
        "http://localhost:8080/api/v1/links/1/downvote",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                 "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
        
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();

// delete comment
(async () => {

    const response = await fetch(
        "http://localhost:8080/api/v1/comment/1",
        {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
                 "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
        
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();

//UPDATE COMMENT
(async () => {
    const data = { content: "Nice post!" };
    const response = await fetch(
        "http://localhost:8080/api/v1/comments/1",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3OTk0MTc4fQ.u2i-63Ld6QFDfc6eVCVoMldRMoQUu_tYbtbBJlLE_-I"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();