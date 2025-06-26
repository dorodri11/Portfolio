import React, { useRef, useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { MdFiberNew } from 'react-icons/md';
import { MdNotificationImportant } from 'react-icons/md';

import interestellarTheme from '../../resources/audios/Interstellar Main Theme - Hans Zimmer.mp3';
import theLastOfUsTheme from '../../resources/audios/TheLastOfus-Theme.mp3';

import { IoPlayCircle } from 'react-icons/io5';
import { IoPlaySkipBackCircle } from 'react-icons/io5';
import { IoPlaySkipForwardCircle } from 'react-icons/io5';
import { IoPauseCircle } from 'react-icons/io5';


import './MainNavbar.css';

export default function MainNavbar() {
    const navRef = useRef();

    const showNavbar = () => {
        
        if (navRef.current.classList.toggle("responsive_nav"))
        { // responsivo ativo e botao precionado
            document.getElementById("btn-hamburguer").style.display = 'none';
            document.getElementById("btn-hamburguer").style.position = 'relative';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityZero");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityUm");

        }else 
        {
            document.getElementById("btn-hamburguer").style.display = 'flex';
            document.getElementById("btn-hamburguer").style.position = 'fixed';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityUm");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityZero");

        }  
    };

    const locationFlag = useLocation();
    const [navBarEmColumn, setNavBarEmColumn] = useState(false);
    



    /* Comom Area */

    const [isAlterRouter, setIsAlterRouter] = useState(false);
    
    useEffect(()=>{

        // console.log("USE EFFECT DO NAVBAR CHAMADOOO");

        if(window.screen.width >= 810 && window.location.href.substring(1).split("/")[4] == 'projects' 
        || window.screen.width >= 810 && window.location.href.substring(1).split("/")[4] == 'certificates' 
        || window.screen.width >= 810 && window.location.href.substring(1).split("/")[4] == 'javaBible'){
            // console.log("ENTROU NO IFISÂO DOS PROJETOS< CERTIFICADOS E JAVA BIBLE");
            const navBarElement = document.getElementById("navbar-container");
            navBarElement.style.flexDirection = "column";
            navBarElement.style.width = "inherit"; 

            navBarElement.childNodes[1].style.width = "100%";
            navBarElement.childNodes[2].style.width = "100%";
            navBarElement.childNodes[3].style.width = "100%";
            navBarElement.childNodes[4].style.width = "100%";
            navBarElement.childNodes[5].style.width = "100%";
            navBarElement.childNodes[6].style.width = "100%";
            navBarElement.childNodes[7].style.width = "100%";

            if (navBarElement.classList.contains("responsive_nav") && window.location.href.substring(1).split("/")[4] == 'projects' || window.location.href.substring(1).split("/")[4] == 'certificates' || window.location.href.substring(1).split("/")[4] == 'javaBible') {
                navBarElement.childNodes[9].style.marginLeft = "auto";
                // console.log("ENTROU NO IF DO contains responsive e é uma das rotas projetos, certificados, ou java bible");
            } else if (!navBarElement.classList.contains("responsive_nav") && window.location.href.substring(1).split("/")[4] == 'projects' || window.location.href.substring(1).split("/")[4] == 'certificates' || window.location.href.substring(1).split("/")[4] == 'javaBible') {
                navBarElement.childNodes[9].style.marginLeft = "0px";
                // console.log("ENTROU NO IF DO NÃO contains responsive e é uma das rotas projetos, certificados, ou java bible");
            }
    
            if (window.location.href.substring(1).split("/")[4] == 'projects' && window.screen.width >= 810){
                const sectionElement = document.getElementById("main-projects--container");
                sectionElement.style.padding = "2rem 0 1rem 10%";
                navBarElement.childNodes[9].style.margin = "auto";
                // console.log("ENTROU NO IF DO é a rota projetos e screen maior ou igual a 810px");
            }else if(window.location.href.substring(1).split("/")[4] == 'certificates' && window.screen.width >= 810){
                const sectionElement = document.getElementById("main-certificate--container");
                sectionElement.style.padding = "2rem 0 1rem 10%";
                navBarElement.childNodes[9].style.margin = "auto";
                // console.log("ENTROU NO IF DO é a rota certificados e screen maior ou igual a 810px");
            }else if(window.location.href.substring(1).split("/")[4] == 'javaBible' && window.screen.width >= 810){
                const sectionElement = document.getElementById("main-javaBible--container");
                sectionElement.style.padding = "2rem 0 1rem 10%";
                navBarElement.childNodes[9].style.margin = "auto";
                // console.log("ENTROU NO IF DO é a rota java bible e screen maior ou igual a 810px");
            }
            
        }else{
            if(window.screen.width >= 810){
                // console.log("ENTROU NO ELSE IF é screen maior ou igual a 810px");
                const navBarElement = document.getElementById("navbar-container");
                navBarElement.style.flexDirection = "row";
                navBarElement.style.width = "100%"; 

                navBarElement.childNodes[1].style.width = "max-content";
                navBarElement.childNodes[2].style.width = "max-content";
                navBarElement.childNodes[3].style.width = "max-content";
                navBarElement.childNodes[4].style.width = "max-content";
                navBarElement.childNodes[5].style.width = "max-content";
                navBarElement.childNodes[6].style.width = "max-content";
                navBarElement.childNodes[7].style.width = "max-content";

                if (window.location.href.substring(1).split("/")[4] == '' || window.location.href.substring(1).split("/")[4] == 'aboutMe' || window.location.href.substring(1).split("/")[4] == 'skills' || window.location.href.substring(1).split("/")[4] == 'curriculumVitae') {
                    navBarElement.childNodes[9].style.margin = "0 0 0 auto";
                    // console.log("ENTROU NO bloco do ELSE IF é screen maior ou igual a 810px, aonde verifica se NÃO contains responsive");
                    // console.log(navBarElement.childNodes[9]);
                }
            }
        }
    }, [navBarEmColumn, locationFlag.pathname]);




    /*======================================== PLAYER MUSIC AREA ============================================*/

    // Local Storage responsável por salvar o estado da musica corrente, guardando o index e o current Time dela
    // Salva apenas em casos de Pause e Re-Loads da página.
    const getLocalStorage_stateOfMusic = () => JSON.parse(localStorage.getItem('db_stateOfMusic')) ?? {indexOfMusic: 0, stateOfTime: 0};
    const setLocalStorage_stateOfMusic = (dbStateOfMusic = {indexOfMusic: 0, stateOfTime: 0}) => localStorage.setItem("db_stateOfMusic", JSON.stringify(dbStateOfMusic));

    // Local Storage responsável por salvar apenas o index da música em execução corrente ()
    const getLocalStorage_indexOfCurrentMusic = () => localStorage.getItem('db_indexOfCurrentMusic') ?? 0;
    const setLocalStorage_indexOfCurrentMusic = (dbIndexOfMusic) => localStorage.setItem("db_indexOfCurrentMusic", Number(dbIndexOfMusic));

    // Harcoded, porém esta em testes ainda, pretendo retirar TODA a lógica deste arquivo.
    const [listOfMusics, setListOfMusics] = useState([
        { title: "Interestellar Theme", src: `${interestellarTheme}`, totalDurationInSeconds: 222.029206 },
        { title: "The Last Of Us Theme", src: `${theLastOfUsTheme}`, totalDurationInSeconds: 222.029206 },
    ]);

    // Além de validar, também ajusta se o index ficar negativo ou maior do que a lista
    // Criando assim efeito de rotação, ou seja, se o index passar do tamanho da lista
    // quer dizer que chegou no final, então faz um rollback para o inicio.
    // Se o index chegar negativo quer dizer que está voltando então faz rollback para o final.
    function validateIndexOfMusic(indexOfCurrentMusic) {

        if (Number(indexOfCurrentMusic) < 0 ) {
    
            let newIndex = (listOfMusics.length-1);
            setLocalStorage_indexOfCurrentMusic(Number(newIndex));

            return;
        } else if (Number(indexOfCurrentMusic) > Number(listOfMusics.length-1)) {

            setLocalStorage_indexOfCurrentMusic(0);

            return;
        }
    }

    useEffect(()=>{

        const player = document.querySelector("#audioPlayer");

        // LIMPA O CACHE POIS EU REMOVI ALGUMAS MUSICAS SE NÃO BUGA PRA QUEM NÃO LIMPAR!!
        if(Number(getLocalStorage_stateOfMusic().indexOfMusic) >= listOfMusics.length) {
            setLocalStorage_stateOfMusic({indexOfMusic: 0, stateOfTime: Number(0)});
            setLocalStorage_indexOfCurrentMusic(0);
            alert("Ocorreram mudanças na playlist e foi detectado que já hávia um estado anterior salvo, porém a musica foi removida! então a playlist voltou ao início, grato e aproveite a navegação! ^^");
        }

        // Plural pois existem dois containers com as mesmas tags em lugares diferentes, porém os dois devem estarem linear
        // ou seja, o estado dos dois devem ser os mesmos, pois a musica em execução é a mesma, só muda a disposição do layout
        // o código é assim devido a responsividade. 

        const playerPlaysElements = document.querySelectorAll(".audioPlayer-control--play");
        const playerPausesElements = document.querySelectorAll(".audioPlayer-control--pause");
        const playerProgressBarsElements = document.querySelectorAll(".audioPlayer-progressBar--fillBar>progress");

        const playerSkipPreviousElements = document.querySelectorAll(".audioPlayer-control--skipPrevious");
        const playerSkipNextsElements = document.querySelectorAll(".audioPlayer-control--skipNext");
        
        
        /* Verifica se já tem musica salva no local storage, e atualiza barra de progresso de acordo com o estado */
        // Pois a musica sempre fica salva no estado em que deu pause, ou mudou, até mesmo em re-loads é salvo o estado antes.

        if (Number(getLocalStorage_stateOfMusic().stateOfTime) > 0) {
            playerProgressBarsElements[0].value = (Number(getLocalStorage_stateOfMusic().stateOfTime) / Number(listOfMusics[Number(getLocalStorage_stateOfMusic().indexOfMusic)].totalDurationInSeconds));
            playerProgressBarsElements[1].value = (Number(getLocalStorage_stateOfMusic().stateOfTime) / Number(listOfMusics[Number(getLocalStorage_stateOfMusic().indexOfMusic)].totalDurationInSeconds));
        }


        /* 
            Eventos de Pausa e Play na musica Obs: Como existem dois containers devido a responsividade, aqui é
            duplicado os códigos para manter o mesmo estado nos dois containers.
        */

        // Serve como se fosse um troca-fitas, ele recebe o index, prepara e da play na musica no objeto player
        // player == elemento HTML <audio> único para os dois containers se não iria tocar duas musicas ao mesmo tempo
        const musicRenderer = (indexOfCurrentMusic) => {
            const musicSelected = listOfMusics[Number(indexOfCurrentMusic)];
        
            player.pause();
            player.currentTime = 0;
        
            player.src = musicSelected.src;
            player.load();
        
            player.addEventListener("loadeddata", () => {
                document.title = musicSelected.title;
            }, { once: true });
        
            player.addEventListener("canplaythrough", () => {
                player.play().catch(err => console.error("Erro ao tocar:", err));
            }, { once: true });
        };

        // Ajusta os icones visuais de acordo com o estado do Player, ou seja, 
        // - Se a musica estiver rolando o icone de "pause" aparece, 
        // - Se a musica for alterada para a próxima o ícone de "pause" aparece,
        // - Se a musica for alterada para a anterior o ícone de "pause" aparece,
        // Obs: if's duplicados alterando apenas a posição do elemento da lista
        // pois existem dois (2) containers na tela que representam o player de musica
        // devido a responsividade eles estão em lugares diferentes, então o estado
        // dos dois sempre é o mesmo.
        const adjustTheDisplayOfIconsPlayAndPause_pauseShowUp = () => {
            
            if (!playerPlaysElements[0].classList.contains("isActiv")) {
                playerPlaysElements[0].classList.add("isActiv");

                playerPausesElements[0].classList.remove("isActiv");
            }
            if (!playerPlaysElements[1].classList.contains("isActiv")) {
                playerPlaysElements[1].classList.add("isActiv");

                playerPausesElements[1].classList.remove("isActiv");
            }
        }



        /* Evento disparado quando a página sofre re-loads, salvando assim o estado da musica corrente em localstorage: */

        window.onbeforeunload = () => {
            if (!(player.currentTime == 0 && Number(getLocalStorage_stateOfMusic().stateOfTime) > 0)) {
                setLocalStorage_stateOfMusic({indexOfMusic: Number(getLocalStorage_indexOfCurrentMusic()), stateOfTime: Number(player.currentTime)});
            } 
            
            
            // if (player.readyState >= 2) { //  Verifica se o recurso está pronto para ser reproduzido (readyState >= 2).

            //     player.play()
            //         .catch(error => {
            //             // Tratar qualquer erro ocorrido durante a reprodução.
            //             console.error('Erro ao reproduzir mídia:', error);
            //         }); 
            // } else {
            //     // Se o recurso ainda não estiver pronto, adicione um ouvinte para o evento 'canplay'.

            //     player.addEventListener("canplay", () => {
            //         console.log("BLOCO DO EVENTO CANPLAY ADICIONADO NO RE_LOAD DA PAG");

            //         player.play()
            //           .catch(error => {
            //             // Tratar qualquer erro ocorrido durante a reprodução.
            //             console.error('Erro ao reproduzir mídia:', error);
            //           });
            //       }, { once: true }); // O ouvinte será acionado apenas uma vez para evitar execuções múltiplas.
            // }
        }



        /* Evento que atualiza a barra de progresso da musica e se chegar no final altera para a próxima */

         // O Player é único para os dois containers que contém os controles play, pause, next, previous e progress bar
         // em lugares diferentes de acordo com a responsividade.



         // Musica chegou no final, altera para a próxima
         player.addEventListener("ended", () => {

            setLocalStorage_indexOfCurrentMusic(Number(getLocalStorage_indexOfCurrentMusic())+1);
             validateIndexOfMusic(Number(getLocalStorage_indexOfCurrentMusic())); 
            musicRenderer(Number(getLocalStorage_indexOfCurrentMusic()));

         });

        player.addEventListener("timeupdate", () => { 
            // console.log('player.duration :>>', player.duration);
            if ((player.currentTime / player.duration) !== NaN && (player.currentTime / player.duration) > 0) {
                playerProgressBarsElements[0].value = (player.currentTime / player.duration);
                playerProgressBarsElements[1].value = (player.currentTime / player.duration);
            } 
        });
        

        function handlePlayerPlayClick() {
            const state = getLocalStorage_stateOfMusic();
            const musicIndex = Number(state.indexOfMusic);
            const stateTime = Number(state.stateOfTime);

            const musicSelected = listOfMusics[musicIndex];
        
            player.pause();
            player.currentTime = 0;
            player.src = musicSelected.src;
            player.load();

            // coloca no titulo o nome da musica:
            player.addEventListener("loadeddata", () => {
                document.title = musicSelected.title;
            }, { once: true });
        
            player.addEventListener("canplaythrough", () => {
                if (stateTime > 0 && stateTime !== player.duration) {
                    player.currentTime = stateTime;
                }
                player.muted = true;
                player.play()
                    .then(() => { player.muted = false; })
                    .catch(err => console.error("Erro ao tocar:", err));
            }, { once: true });
            
            // Flagga que o Play está ativo, sumindo com o icon de Play e Aparecendo o icon de Pause
            adjustTheDisplayOfIconsPlayAndPause_pauseShowUp();
        }
        playerPlaysElements[0].children[0].addEventListener("click", () => handlePlayerPlayClick());
        playerPlaysElements[1].children[0].addEventListener("click", () => handlePlayerPlayClick());


        function handlePlayerPauseClick() {
        // salva o estado em que a música foi pausada em local storage
            setLocalStorage_stateOfMusic({
                indexOfMusic: Number(getLocalStorage_indexOfCurrentMusic()),
                stateOfTime: Number(player.currentTime)
            });
        
            player.pause();
        
            // Flagga que o Pause está ativo, sumindo com o icon de Pause e Aparecendo o icon de Play
            // Obs: Não estraí em outro método pois essa lógica só é aplicada aqui, ela é exatamente
            // a mesma lógica que o `adjustTheDisplayOfIconsPlayAndPause_pauseShowUp()` PORÉM invertido, ou seja, 
            // O úncio momento em que o icon de play aparece é quando o pause é acionado, 
            // o outro método é aplicado em 3 partes, pois o icon de pause aparece em 3 momentos:
            // Quando da play em sí na musica, Quando vai para a próxima, e Quando vai para a anterior;
            if (!playerPausesElements[0].classList.contains("isActiv")) {
                playerPausesElements[0].classList.add("isActiv");
                playerPlaysElements[0].classList.remove("isActiv");
            }
            if (!playerPausesElements[1].classList.contains("isActiv")) {
                playerPausesElements[1].classList.add("isActiv");
                playerPlaysElements[1].classList.remove("isActiv");
            }
        }
        playerPausesElements[0].children[0].addEventListener("click", () => handlePlayerPauseClick());
        playerPausesElements[1].children[0].addEventListener("click", () => handlePlayerPauseClick());


         /* Mudando de musicas Next e Previous */

         function handlePlayerSkipPreviousClick () {
            const newIndex = Number(getLocalStorage_indexOfCurrentMusic()) - 1;
            setLocalStorage_indexOfCurrentMusic(newIndex);
            validateIndexOfMusic(newIndex);
        
            musicRenderer(newIndex);
            adjustTheDisplayOfIconsPlayAndPause_pauseShowUp();
        }
        playerSkipPreviousElements[0].children[0].addEventListener("click", () => handlePlayerSkipPreviousClick());
        playerSkipPreviousElements[1].children[0].addEventListener("click", () => handlePlayerSkipPreviousClick());


        function handlePlayerSkipNextClick () {
            const newIndex = Number(getLocalStorage_indexOfCurrentMusic()) + 1;
            setLocalStorage_indexOfCurrentMusic(newIndex);
            validateIndexOfMusic(newIndex);
        
            musicRenderer(newIndex);
            adjustTheDisplayOfIconsPlayAndPause_pauseShowUp();
        }
        playerSkipNextsElements[0].children[0].addEventListener("click", () => handlePlayerSkipNextClick());
        playerSkipNextsElements[1].children[0].addEventListener("click", () => handlePlayerSkipNextClick());

    }, []);

   

    
    return (
<>
    <nav id="navbar-container" ref={navRef} >
        <button id="nav-close-btn" className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
        <a href="/">Home</a>
        <a className= "-minWidthMaxContent" href="/#/aboutMe" onClick={() => setNavBarEmColumn(true)}>Sobre Mim</a>
        <a href="/#/skills" rel="Link Linguagens" onClick={() => setNavBarEmColumn(true)}>Habilidades</a>     
        <a href="/#/projects" rel="Link Projetos" onClick={() => setNavBarEmColumn(true)}>Projetos</a>
        <a href="/#/certificates" rel="Link Certificados" onClick={() => setNavBarEmColumn(true)}>Certificados</a>   
        <a href="/#/curriculumVitae" rel="Link Curriculo" onClick={() => setNavBarEmColumn(true)}>Currículo</a>     
        <a target="_blank" className="-btn-ancorToJavaBibleScreen -minWidthMaxContent" href="https://bibleofjava.wellisonbertelli.com.br/" rel="Link Biblia do Java" onClick={() => setNavBarEmColumn(true)}>Bíblia do Java <MdFiberNew className="animaIconPisca"/></a>        
        {/* <a target="_blank" href="https://bibleofjava.wellisonbertelli.com.br/" rel="Link Curriculo" onClick={() => setNavBarEmColumn(true)}>Currículo</a>   */}

        <audio id="audioPlayer" src={interestellarTheme}></audio>
        <div className="audioPlayer--container --audioPlayer--container --navBar -minWidthMaxContent">
            <div className="audioPlayer--controls">
                <i className="audioPlayer-control--skipPrevious"><IoPlaySkipBackCircle/></i>
                <i className="audioPlayer-control--play"><IoPlayCircle/></i>
                <i className="audioPlayer-control--pause isActiv"><IoPauseCircle/></i>
                <i className="audioPlayer-control--skipNext"><IoPlaySkipForwardCircle/></i>
            </div>
            <div className="audioPlayer-progressBar--duration">
                <div className="audioPlayer-progressBar--fillBar">
                    <progress value="0" max="1"></progress>
                </div>
            </div>
        </div>
    </nav>
    <button id="btn-hamburguer" className="nav-btn"><FaBars onClick={showNavbar}/>{window.location.href.substring(1).split("/")[4] === 'javaBible' ? "" : <MdNotificationImportant className="animaIconPisca--alert" onClick={showNavbar}/>}

        <div className="audioPlayer--container --btnHamburguerResponsive">
            <div className="audioPlayer--controls">
                <i className="audioPlayer-control--skipPrevious"><IoPlaySkipBackCircle/></i>
                <i className="audioPlayer-control--play"><IoPlayCircle/></i>
                <i className="audioPlayer-control--pause isActiv"><IoPauseCircle/></i>
                <i className="audioPlayer-control--skipNext"><IoPlaySkipForwardCircle/></i>
            </div>
            <div className="audioPlayer-progressBar--duration">
                <div className="audioPlayer-progressBar--fillBar">
                    <progress value="0" max="1"></progress>
                </div>
            </div>
        </div>

    </button>
</>
    )
};
