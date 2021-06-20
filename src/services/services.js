import axios from "axios";


export async function getNotes(user){
    console.log(user);
    const a=await axios.post("/api/getNotes",{token:user});
    console.log("GETNOTES : "+a);
    console.log(a.data[0].notes);
    return await a.data[0].notes;
};

export async function addNotes(user,data){
    console.log(user);
    var a="sample";
    a=await axios.post("/api/addNotes",{token:user,data:data});
    console.log(a);
    return "SUCCESS";
}

export async function deleteNotes(user,id){
    console.log(id);
    var a=await axios.post("/api/deleteNotes",{token:user,id:id});
    console.log(a);
    return await a;
}

export async function editNotes(user,id,data){
    console.log(data);
    var a = await axios.post("/api/editNotes",{token:user,id:id,data});
    console.log(a);

}