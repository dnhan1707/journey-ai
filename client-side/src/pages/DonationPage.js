import DonationForm from "../components/DonationForm";
import { QueryProvider } from "../QueryProvider";
import login_background from '../pictures/login_background.png';



function DonationPage(){
    return(
        <div
        style={{
            backgroundImage: `url(${login_background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            <QueryProvider>
                <div className="flex justify-center items-center min-h-screen p-4">
                    <DonationForm/>
                </div>
            </QueryProvider> 
        </div>

    )
}

export default DonationPage;
