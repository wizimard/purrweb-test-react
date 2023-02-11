import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { EditSvg } from "../../img";
import { ButtonElement } from "../../ui";

import Faq from "./Faq";

import ActivityImagePng from '../../assets/img/image.png';

import './Home.css';

const FaqData = [
  {
    title: 'Подписываете ли вы соглашение о неразглашении?',
    content: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'
  },
  {
    title: 'Сколько займет создание MVP?',
    content: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'
  },
  {
    title: 'Предоставляете ли вы маркетинговые услуги?',
    content: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'
  },
  {
    title: 'Различается ли MVP от прототипов?',
    content: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'
  }
];

const Home: React.FC = () => {

  const user = useAppSelector(state => state.state.user);

  return (
    <>
      {user && (
        <main className="home">
          <div className="home__profile">
            <div className="home__profile--header">
              <h2 className="semibold fz-36">Мой профиль</h2>
              <ButtonElement styleType="text-primary">
                <EditSvg />
                <span>Редактировать</span>
              </ButtonElement>
            </div>
            <ul className="home__profile--info">
              <li>
                <span className="fz-14 home__profile--info-title">Имя</span>
                <span className="medium fz-16">{ user.name }</span>
              </li>
              <li>
                <span className="fz-14 home__profile--info-title">Фамилия</span>
                <span className="medium fz-16">{ user.surname }</span>
              </li>
              <li>
                <span className="fz-14 home__profile--info-title">Телефон</span>
                <span className="medium fz-16">{ user.phone }</span>
              </li>
              <li>
                <span className="fz-14 home__profile--info-title">Электронная почта</span>
                <span className="medium fz-16">{ user.email }</span>
              </li>
            </ul>
          </div>
          <div className="home__activity">
            <div className="home__activity--info">
              <h4 className="semibold fz-24">Ваша продуктивность выросла!</h4>
              <p className="medium fz-16">За прошлую неделю вы выполнили 12 задач</p>
              <ButtonElement styleType="primary">Подробнее</ButtonElement>
            </div>
            <img src={ActivityImagePng} alt="activity" />
          </div>
          <div className="home__faq">
            <h4 className="semibold fz-24">Часто задаваемые вопросы</h4>
            <ul>
              {FaqData.map((data) => (
                <Faq key={data.title}
                  title={data.title}
                  content={data.content} />
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;