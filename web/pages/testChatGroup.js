import React, { useEffect } from "react";
import {X, Minus,Video,Phone,Image,Smile,Mic,ThumbsUp,ArrowUpCircle} from "react-feather";
import { useSelector } from "react-redux";

 export default function ChatTest() {
    const [name1, setName1] = React.useState("Naruto");
    const [name2, setName2] = React.useState("Sasuke");
    const user = useSelector((state) => state.user.user);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [message, setMessage] = React.useState(["Hi","Hello","How are you?","I'm fine, thank you!","What about you?","I'm fine too!","Nice to meet you!","Nice to meet you too!","Bye","Bye!"]);

    const insertMessages = () =>{
        let term = [...message];
        term.push(currentMessage);
        setMessage(term);
        setCurrentMessage("");
        console.log(user);
    }
    return (
        <div className="block absolute w-96 h-96 border-black ">
            
            <div className="flex flex-row px-2 py-2 bg-[#0084FF] rounded-t-lg shadow-lg justify-between">
                {/* Head*/}
                <div className="flex relative items-center">
                    <div className="block relative">
                        <img className="rounded-full w-10 h-10" src="https://kenh14cdn.com/thumb_w/640/pr/2020/1607432797539-0-111-669-1181-crop-1607432803997-63743074283293.jpg" />
                        <div className="absolute bg-[#31a24c] w-3.5 h-3.5 rounded-full border-2 border-white-100 bottom-0 right-0"></div>
                    </div>
                    <div className="ml-4">
                        <p className="text-white font-sans inherit text-sm font-semibold">Naruto</p>
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
            <div className="h-80 block overflow-auto bg-[#FFFFFF] ">
                <div className="py-2 px-3 ">
                    <div className="flex justify-center mb-2">
                        <p className="text-gray-400 text-xs">Hôm nay</p>
                    </div>
                </div>
               {1&&message.map((item,index)=>{
                    if(index%2==0)return(
                        <div className="flex mb-2 px-2 py-1 items-end">
                            <div className="block px-2">
                                <img className="w-6 h-6 rounded-full  bottom-0" src="https://kenh14cdn.com/thumb_w/640/pr/2020/1607432797539-0-111-669-1181-crop-1607432803997-63743074283293.jpg" />
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
                        if(e.key==="Enter"){
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
    );
    
 }
