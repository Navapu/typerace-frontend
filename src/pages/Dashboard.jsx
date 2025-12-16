import { WelcomeCard } from "../components/WelcomeCard.jsx"
import { PlayerStatsCard } from "../components/PlayerStatsCard.jsx"
export const Dashboard = () => {
    return(
        <div>
            <WelcomeCard />
            <PlayerStatsCard />
        </div>
    )
}