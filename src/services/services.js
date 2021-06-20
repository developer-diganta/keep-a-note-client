import axios from "axios";


export async function getNotes(user){
    console.log(user);
    const a=await axios.post("https://keep-a-note.herokuapp.com/api/getNotes",{token:user});
    console.log("GETNOTES : "+a.data.length);

    // console.log(a.data[0].notes);
    // if(a==={})
    //     console.log("EMPTY");
    // console.log(a.data[0].notes);
    if(a.data.length===0){
        return ([]);
    }
    else
    return await a.data[0].notes;
};

export async function addNotes(user,data){
    console.log(user);
    var a="sample";
    a=await axios.post("https://keep-a-note.herokuapp.com/api/addNotes",{token:user,data:data});
    console.log(a);
    return "SUCCESS";
}

export async function deleteNotes(user,id){
    console.log(id);
    var a=await axios.post("https://keep-a-note.herokuapp.com/api/deleteNotes",{token:user,id:id});
    console.log(a);
    return await a;
}

export async function editNotes(user,id,data){
    console.log(data);
    var a = await axios.post("https://keep-a-note.herokuapp.com/api/editNotes",{token:user,id:id,data});
    console.log(a);

}