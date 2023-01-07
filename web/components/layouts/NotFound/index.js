import react from "react";
import { Button } from "antd";


export default function NotFound({children}) {
    return (
        <div className="flex flex-col items-center laptop:items-start justify-center h-full bg-white rounded-[15px] m-[10px] max-h-[600px]">
            <div className="flex flex-col items-center justify-center h-full max-w-xl laptop:ml-[84px]"> 
            <img src="http://sociala.uitheme.net/assets/images/bg-43.png" alt="404" className="w-[175px] h-[233px]" />
            <div className="text-5xl font-bold text-center">Oops! It looks like you're lost.</div>
            <div className="text-sm text-gray-text mt-2">The page you're looking for isn't available. Try to search again or use the go to.</div>
            <Button type="primary" className="mt-4 bg-[#0055ff] rounded-[5px] text-xs font-bold" size="large" href="/..">Home Page</Button>
            </div>
        </div>
    
    );
}
