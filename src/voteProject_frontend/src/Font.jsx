import React from "react";
import {Link} from 'react-router-dom'

function Fontslide(){

    return(

        <div>

            <div className="Header-page">

            <div className="title-part">
            <h1>Welcome to Decentralized Community</h1>
            </div>

            <div className="mid-page">

            <div className="webdao">

            <h2>Web DAO</h2>
            <p>A Web3 DAO (Decentralized Autonomous Organization) is a community-governed platform where decisions are made collectively, removing the need for a central authority</p>

            </div>


            <div className="propsals-part">
            <h2>Join Proposals</h2>
            <p>When you join a DAO, you gain the ability to propose new ideas, vote on proposals, and influence the direction of the community. Proposals can cover a range of topics, such as project funding, rule changes, or community initiatives. By participating in these proposals, members contribute to the organization’s decision-making process, ensuring it operates in a fair, decentralized way</p>
            </div>


            </div>


            <div className="Sets">

                <div className="create-propsals">

                    <i class="fa-solid fa-globe"></i>
                    <h1>create-propsals</h1>
                    <p>Creating proposals in a DAO allows you to suggest new ideas or changes that can shape the future of the community. Whether it's a project, rule adjustment, or funding request, your proposal can initiate discussions and bring the community closer to making collective decisions.</p>
                    <button><Link to = "/createpage" target="blank">Create</Link></button>

                </div>
                <div className="Vote together">

                    <i class="fa-duotone fa-solid fa-check-to-slot"></i>
                    <h1>Vote Together</h1>
                    <p>Voting is a key feature in a DAO. Once proposals are created, members come together to vote on them, ensuring that every decision reflects the majority's opinion. By voting, you actively participate in the direction and growth of the community, making it a truly decentralized experience.</p>
                     <button> <Link to = "/votepage" target="blank">Vote</Link></button>

                </div>
                <div className="See other Propsals">

                   <i class="fa-solid fa-eye"></i>
                    <h1>See our Proposal status</h1>
                    <p>In a DAO, you can view all active proposals submitted by other members. This gives you the opportunity to stay informed about what’s being discussed and ensure that every voice is heard in the decision-making process. You can also vote on proposals that resonate with you or contribute to their development.</p>
                    <button> <Link to = "/otherPropsals" target="blank">See</Link></button>



                </div>





            </div>






            </div>



        </div>
    )


}


export default Fontslide