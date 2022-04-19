import { useEffect } from "react";
import Image from 'next/image';


function Vouched() {

    useEffect(() => {
        // var vouched = Vouched({
        //     appId: "Vu#UQ-wfriGb!85W0cZEEwGS#7.s~n",
        //     // your webhook for POST verification processing
        //     callbackURL: '',
        //     // mobile handoff
        //     crossDevice: true,
        //     crossDeviceQRCode: true,
        //     sandbox: true,
        //     // theme
        //     theme: {
        //         name: 'avant',
        //     },
        //     });
        //     vouched.mount("#vouched-root");
    });

    // let vouchedOpen = false;
    // const toggleVouched = () => {
    //     vouchedOpen = !vouchedOpen
    //     document.getElementById("vouched-root").style.visibility = vouchedOpen ? "visible" : "hidden";
    // }

    return (
        <div className="section">
            <Image className="logo" width="300" height="200" src="/logo_vouched.png" alt="OneID provider logo" />
            <div>
                <button id='vouched-button'>VERIFY NOW</button>
                <div id='vouched-root' className="full-width"></div>
            </div>
        </div>
    );

}

export default Vouched;
