import { WelcomeCard } from "../components/WelcomeCard.jsx"
import { PlayerStatsCard } from "../components/PlayerStatsCard.jsx"
import { RecentGamesCard } from "../components/RecentGamesCard.jsx"
export const Dashboard = () => {
    return(
        <div>
            <WelcomeCard />
            <PlayerStatsCard />
            <RecentGamesCard />
        </div>
    )
}