import {useEffect, useState} from "react";
import {Alert, Button, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography} from "@material-tailwind/react";
import {useSearchStore} from "../stores/searchStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import Posts from "../components/Posts.jsx";
import UserList from "../components/UserList.jsx";
import {useTranslation} from "react-i18next";
import NProgress from "nprogress";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const [tab, setTab] = useState("user");
    const [searchRoll, setSearchRoll] = useState("");

    const {t} = useTranslation();

    const {searchUsers, searchGames, searchError, searchLoading, searchGame, searchUser} = useSearchStore();

    const data = ["user", "game"];

    const searchFn = async () => {
        if(!searchInput || searchInput === "") return; // Searching only if there's something to search
        setSearchRoll("");
        if(searchInput.toLowerCase() === "do a barrel roll") setSearchRoll(Math.floor(Math.random() * 100_000_000) === 0 ? "main-is-roll-reverse" : "main-is-roll"); // Easter egg

        // If the tab is user, we search for users, else we search for games
        if(tab === "user"){
            await searchUser(searchInput);
        }else await searchGame(searchInput);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            NProgress.start();
            await searchFn();
        }catch(err){
            console.error(err);
        }finally{
            NProgress.done();
        }
    }

    // When the user change tab, we search for the new tab
    useEffect(() => {
        const fetch = async () => {
            try{
                NProgress.start();
                await searchFn();
            }catch(err){
                console.error(err);
            }finally{
                NProgress.done();
            }
        }

        (async () => await fetch())();
    }, [tab]);

    const Spinner = () => (
        <div className="w-full h-full flex justify-center items-center">
            <DefaultSpinner/>
        </div>
    );

    return (
        <main className={`pt-8 ${searchRoll}`}>
            {searchError && (
                <section className="flex justify-center w-full mb-6">
                    <Alert color="red">
                        {searchError}
                    </Alert>
                </section>
            )}
            <section className="max-w-2xl mx-auto">
               <form className="relative flex w-full" onSubmit={onSubmit}>
                   <Input
                       value={searchInput}
                       onChange={(e) => setSearchInput(e.target.value)}
                       color="deep-orange"
                       label={t("forms.search")}
                       variant="outlined"
                       className="text-primary-900"
                       containerProps={{className: 'min-w-0'}}
                   />
                   <Button
                       size="sm"
                       color="deep-orange"
                       disabled={!searchInput}
                       className="!absolute right-1 top-1 rounded"
                       onClick={onSubmit}
                   >
                       {t("forms.search")}
                   </Button>
               </form>
                <div className="mt-2">
                    <Tabs value={tab}>
                        <TabsHeader className="w-fit mx-auto">
                            {data.map((tab) => (
                                <Tab key={tab} value={tab} onClick={() => setTab(tab)} className="w-fit">
                                    <Typography variant="lead" className="text-xl">
                                        {t(`search.${tab}`)}
                                    </Typography>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value="user">
                                {searchLoading ? (
                                    <Spinner/>
                                ):(<UserList users={searchUsers}/>)}
                            </TabPanel>
                            <TabPanel value="game">
                                {searchLoading ? (
                                    <Spinner/>
                                ):(<Posts posts={searchGames}/>)}
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </div>
            </section>
        </main>
    );
};

export default Search;