import { data } from "autoprefixer";
import React, { useEffect } from "react";
import {X, Minus,Video,Phone,Image,Smile,Mic,ThumbsUp,ArrowUpCircle} from "react-feather";
import { useSelector } from "react-redux";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "~/api/axios";
//6eae2e7a-ec5d-412e-98f3-653344d6b6bb
//07ef9fcf-3787-4418-b282-eb37f010be6c
 export default function ChatTest() {
    const [name1, setName1] = React.useState("");
    const [targetId,setTagetId] = React.useState("");
    const [chanelName,setChanelName] = React.useState("");
    const [input,setInput] = React.useState("");
    const [target,setTarget] = React.useState({
        data:{
            avatar:"https://i.pinimg.com/originals/0c/0c/0c/0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c.jpg",
            firstName:"",
            lastName:"",
        }
    });
    ///////////////////////////////////////
    let messages =[];
    const messageEndRef = React.useRef(null);
    const user = useSelector((state) => state.user.user);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [message, setMessage] = React.useState([""]);
    const pusher = new Pusher("61ced07f1c5be563dc8f", {
        cluster: "ap1",
    });
    const chanel = pusher.subscribe("1chat");
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    const changeID = () =>{
        console.log(input)
        setTagetId(input);
        setInput("");
    }
    React.useEffect( () => {
       // Pusher.logToConsole = true;
        const pusher = new Pusher("61ced07f1c5be563dc8f", {
            cluster: "ap1",
            encrypted: true,
        });
        scrollToBottom();  
        axios.get(`/users/${targetId}`)
        .then((res)=>{
            setTarget(res.data);
            setName1(res.data.data.firstName+" "+res.data.data.lastName);
       })
       .catch((err)=>{
              console.log(err);
       })
       const channel = pusher.subscribe('')
       setName1(target.data.firstName+" "+target.data.lastName);
       scrollToBottom();
       if(user.id[0]>targetId[0]){
        setChanelName(user.id.slice(0,3)+targetId.slice(0,3));
         }else{
        setChanelName(targetId.slice(0,3)+user.id.slice(0,3));
        }

    },[targetId])

    React.useEffect(()=>{
        scrollToBottom();
        //Pusher.logToConsole = true;
        // const pusher = new Pusher("61ced07f1c5be563dc8f", {
        //     cluster: "ap1",
        //     encrypted: true,
        // });
        // const chanel = pusher.subscribe("1chat");
        // chanel.bind('message', function(data) {
        //     messages.push(data);
        //     console.log(data);
        //     setMessage(messages);
        // })
        // console.log(messages);
    });
    const insertMessages = async () =>{
        
        let data = {
            user_src:user.id,
            message:currentMessage
        }
        await axios.post('/chat/sendMessage',data)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        setCurrentMessage("");
        
        chanel.bind('message-sent', function(data) {
            messages.push(data);
            console.log(data);
            setMessage(messages);
        })
        console.log("test:",messages);
        scrollToBottom();
    }
    
    return (
        <>
        <div>id user:{user.id}</div>
        <div>chanel:{chanelName}</div>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className ="w-full"
        >

        </input>
        <button onClick={changeID}>Send</button>

        <div className="block absolute w-96 h-96 border-black ">
            <div className="flex flex-row px-2 py-2 bg-[#0084FF] rounded-t-lg shadow-lg justify-between">
                {/* Head*/}
                <div className="flex relative items-center">
                    <div className="block relative">
                        <img className="rounded-full w-10 h-10" src={target.data.avatar}/>
                        <div className="absolute bg-[#31a24c] w-3.5 h-3.5 rounded-full border-2 border-white-100 bottom-0 right-0"></div>
                    </div>
                    <div className="ml-4">
                        <p className="text-white font-sans inherit text-sm font-semibold">{name1}</p>
                        <p className="text-white font-sans font-normal text-xs">Đang hoạt động</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="px-2">
                        <Phone color="#FFFFFF" size={20}/>
                    </div>
                    <div className="px-2">
                        <Video color="#FFFFFF" size={22}/> 
                    </div>
                    <div className="px-2">
                        <Minus color="#FFFFFF" size={22}/>
                    </div>
                    <div>
                        <X color="#FFFFFF" size={22}/>
                    </div>
                </div>
            </div>
            {/* Message */}
            <div className="h-80 block overflow-auto bg-[#FFFFFF] " >
                <div className="py-2 px-3 ">
                    <div className="flex justify-center mb-2">
                        <p className="text-gray-400 text-xs">Hôm nay</p>
                    </div>
                </div>
               {1&&message.map((item,index)=>{
                    if(index%2==0)return(
                        <div className="flex mb-2 px-2 py-1 items-end">
                            <div className="block px-2">
                                <img className="w-6 h-6 rounded-full  bottom-0" src={target.data.avatar} />
                            </div>
                            <div className="max-w-200 mx-2">
                                <p className="font-sans font-normal text-xs">{name1}</p>
                                <div className="bg-[#e4e6eb] max-w-200 rounded-full">
                                    <p className="text-xs px-2 max-w-200 py-1 block">{item}</p>
                                </div>
                            </div>
                        </div>
                    )
                        return(
                            <div className="flex mb-2 px-2 py-3 justify-end">
                                <div className="max-w-200 mx-2">
                                    <div className="bg-[#0084FF] max-w-200 rounded-full">
                                        <p className="text-xs px-2 py-1 max-w-200 block text-white">{item}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    
                })}
            </div>
            {/* Input */}
            <div className="flex flex-row px-2 py-2 bg-[#FFFFFF] rounded-b-lg shadow-lg items-center">
                
                {currentMessage.length===0&&
                    <div className="px-2">
                        <Image color="#0084FF" size={22}/>
                    </div>
                }
                {currentMessage.length===0&&
                    <div className="px-2">
                        <Smile color="#0084FF" size={22}/>
                    </div>
                }
                {currentMessage.length===0&&
                    <div className="px-2">
                        <Mic color="#0084FF" size={22}/>
                    </div>
                }
                <input
                    className="w-full px-2 py-2 rounded-full bg-[#f0f2f5] focus:outline-none"
                    placeholder="Nhập tin nhắn..."
                    value={currentMessage}
                    onChange={(e)=>setCurrentMessage(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"&&currentMessage.length>0){
                            insertMessages();
                        }
                    }}
                >
                
                </input>
                {currentMessage.length==0&&
                    <div className="px-2">
                        <ThumbsUp color="#0084FF" size={22}/>
                    </div>
                }
                {currentMessage.length>0&&
                    <div className="px-2">
                        <button
                            onClick={insertMessages}
                        >
                            <ArrowUpCircle color="#0084FF" size={22}/>
                        </button>
                    </div>
                }
            </div>
        </div>
        
        </>
    );
    
 }
