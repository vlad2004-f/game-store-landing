import React, { useState, useEffect, useRef } from "react";
import ModalWindow from "./ModalWindow";
import AllGames from "./AllGames";
import Discounts from "./Discounts";
import Shooters from "./Shooters";
import Strategies from "./Strategies";
import OnlineGames from "./OnlineGames";
import Review from "./Review";
import {isVisible} from "@testing-library/user-event/dist/utils";
import Theme from "./Theme";

const Main = () => {

  const {theme, setTheme} = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saveTheme = localStorage.getItem("theme");
    return saveTheme === 'dark';
  });

  const toggleTheme = () => {
    if(isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme('light');
  };

  const darkTheme = () => {
    setTheme('dark');
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderComponent = () => {
    switch (selectedCategory) {
      case 'All':
          return <AllGames />
      case 'Discounts':
        return <Discounts />
      case 'Shooters':
        return <Shooters />
      case 'Strategies':
        return <Strategies />
      case 'OnlineGames':
        return <OnlineGames />
      default:
        return <AllGames />
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const  reviews = [
      <Review key={1} name ='Омельченко Є.' link = 'https://t.me/omelchenko_8494'
      text = "Відгук, який залишив Євген"/>,
    <Review key={2} name ='Гориславець В.' link = 'https://t.me/kryptoportfolio'
            text = "Відгук, який залишив Володимир"/>,
    <Review key={3} name ='Смірнова А' link = 'https://t.me/ANTONINO4K_A'
            text = "Відгук, який залишив Антоніна"/>
  ]
  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if(box.scrollLeft <= 0){
      box.style.scrollBehavior = "auto";
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = "smooth";
    }

    if(box.scrollLeft >= box.scrollWidth - width){
      box.style.scrollBehavior = "auto";
      box.scrollLeft = width;
      box.style.scrollBehavior = "smooth";

    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector('.review-card');
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollLeft - width) / 2;
    box.addEventListener('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
      setScroll(window.scrollY);
  }

  const upButton = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }

  useEffect(() => {
      window.addEventListener("scroll", scrollUp);
    }, [])

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  }

  return (
      <div className="App">
        <header>
          <div className="navigation">
            <div className="menu">
              <a onClick={upButton}>Про нас</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))}  height = "700">Категорії</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))}  height = "1230">Товари</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))}  height = "1920">Відгуки</a>
              <a onClick={(e) => toBlock(e.target.getAttribute('height'))}  height = "2600">Гарантії</a>
            </div>
              <div className="header-buttons">
                <button onClick={handleOpenModal} className="btn">Контакти</button>

                <a href="https://t.me/Xantares_Prime" target="_blank"
                   className={theme === "light" ? "icon telegram light" : "icon telegram dark"}/>
                <a href="https://www.instagram.com/v_l_a_d_0s/" target="_blank"
                   className={theme === "light" ? "icon instagram light" : "icon instagram dark"}/>

                <div className="switch" onClick={toggleTheme}>
                  <div className={theme === 'light' ? 'theme light' : 'theme dark'}
                  style={{ transform: isDarkTheme ? 'translateX(38px)' : 'translate(0)'}}></div>
                </div>
              </div>
          </div>
        </header>

        <ModalWindow show={showModal} onClose={handleCloseModal}>

          <h2 style={{color: "#4824ff", fontSize: "40px"}}>Контакти</h2>
          <p style={{fontSize: "22px"}}>Ви можете зв'язатися з нами в Телеграм чи Інстаграм</p>
        </ModalWindow>

        <div className="welcome-block">
          <div className="first-block">
            <h1><span className="title">NextPlay</span> - твій наступний крок у світ відеоігр</h1>
            <h2 style={{marginBottom: "7%", marginTop: "7%"}}>
              Нам довіряють
              більше <span style={{color: "#4824ff"}}> мільйона </span>
              клієнтів </h2>
            <h3>Працюємо з <span style={{color: "#4824ff"}}>2020 року</span></h3>
          </div>
          <div>
            <img className="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="NextPlay Logo"
                 draggable="false"/>
          </div>
        </div>
          <div className="service-block" draggable="false">
            <h1 style={{fontSize: "52px"}}>КАТЕГОРІЇ</h1>
            <p style={{fontSize: "27px"}}>Ви знайдете найкращі
              ігри для всіх <span style={{color: "#4824ff"}}>платформ</span> та
              <span style={{color: "#4824ff"}}> жанрів</span>.<br/>
              У нас представлені:
            </p>

          <div style={{display: "flex"}}>
            <p className="tag"> Ігри зі знижками та бонусами</p>
            <p className="tag">Екшени</p>
            <p className="tag">шутери</p>
            <p className="tag">Пригодницькі ігри</p>
          </div>
          <div style={{display: "flex", marginTop: "16px"}}>
            <p className="tag">Симулятори</p>
            <p className="tag">стратегії</p>
            <p className="tag">Онлайн та кооперативні</p>
            <p className="tag">Інді та ретро-класика</p>
          </div>
            <p style={{fontSize: "27px"}}>
              Залишились питання чи потрібна допомога з вибором?<br/>
              Пиши нам у <span style={{color :"#4824ff", cursor: "pointer"}}
              onClick={handleOpenModal}> Telegram чи Instagram</span> – завжди на зв'язку!
            </p>
          </div>
        <div className="portfolio-block">
          <div className="first-block">
            <h1 className="main-title">Товари</h1>
            <div style={{position: "absolute", marginLeft: "-430px"}}>
              <p className="gradient-part-one"></p>
              <p className="title-border">Тов</p>
            </div>
            <div style={{position: "absolute", marginLeft: "410px"}}>
              <p className="gradient-part-two"></p>
              <p className="title-border">ари</p>
            </div>
            <img className="array-icon" src={`${process.env.PUBLIC_URL}/icons/array.png`} alt="array-icon"
                 draggable="false"/>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
            <p className={`tag ${selectedCategory ===
            'All' ? 'selected' : ''}`}
               onClick={() => setSelectedCategory('All')}>
              Усі ігри</p>
            <p className={`tag ${selectedCategory ===
            'Discounts' ? 'selected' : ''}`}
               onClick={() => setSelectedCategory('Discounts')}>
              Знижки та спеціальні пропозиції</p>
            <p className={`tag ${selectedCategory ===
            'Shooters' ? 'selected' : ''}`}
               onClick={() => setSelectedCategory('Shooters')}>
              Шутери</p>
            <p className={`tag ${selectedCategory ===
            'Strategies' ? 'selected' : ''}`}
               onClick={() => setSelectedCategory('Strategies')}>
              Стратегії</p>
            <p className={`tag ${selectedCategory ===
            'OnlineGames' ? 'selected' : ''}`}
               onClick={() => setSelectedCategory('OnlineGames')}>
              Онлайн або кооперативні ігри</p>
          </div>
          <div className="content" style={{marginLeft: "-5vw", marginRight: "-5vw"}}>
            {renderComponent()}
          </div>
        </div>


        <div className="review-block">
          <h1>ВІДГУКИ</h1>
          <p className="description">Відгуки від клієнтів, написані зі своїх
            особитих аккаунтів Телеграм!<br/>
            Любий відгук можна відкрити в Телеграм та
            спитати про враження роботи з нами<br/>
            у клієнта, який залишив відгук особисто.</p>

          <div className="review-carausel">
            <div className ="review-container" ref={containerRef}>
              {reviews.slice(-visibleReviews)}
              {reviews}
              {reviews.slice(0, -visibleReviews)}
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center"}} >
            <p className="next-button">
              <p className="array-next-icon" onClick={btnPrevReview}/></p>
            <p className="next-button" style ={{transform:  "rotate(180deg)"}}>
              <p className="array-next-icon" onClick={btnNextReview}/></p>
          </div>
        </div>
        <div className="guarantees-block">
          <h1 style ={{fontSize: "52px", paddingBottom: "20px"}}>
            ГАРАНТІЇ
          </h1>

          <ol className="guarantees-points">
            <li className="point"><span style={{color: "#4824ff"}}>Ліцензійні ключі</span> - всі ігри офіційні, з активацією через Steam, Epic Games, Origin та інші платформи.</li>
            <li className="point"><span style={{color: "#4824ff"}}>Моментальна доставка</span> - ключ приходить відразу після оплати на ваш e-mail або в особистий кабінет.</li>
            <li className="point"><span style={{color: "#4824ff"}}>Захист покупки</span> - якщо ключ не активується, ми повернемо гроші або замінимо робітника.</li>
            <li className="point"><span style={{color: "#4824ff"}}>Цілодобова підтримка</span> - наша команда завжди допоможе з встановленням та активацією гри.</li>
          </ol>
        </div>
        <div className="footer"> © Nextplay</div>

        <button
        className={scroll < 1960 ? "" : "btn-up"}
        onClick={upButton}></button>

      </div>
  );
}

export default Main;
