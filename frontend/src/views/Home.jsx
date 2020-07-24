import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { H3, TextParagraph } from "../styles/texts";
import { FlexDiv } from "../styles/containers";

const articles = [
  {
    title: "First Title",
    imageSrc: "../img/story-news/white_chocolate",
    imageAlt: "Photo",
    link: "/news",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    date: "20/07/2020",
  },
  {
    title: "Second Title",
    imageSrc: "../img/story-news/chocolate_bar",
    imageAlt: "Photo",
    link: "/news",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    date: "21/07/2020",
  },
  {
    title: "Third Title",
    imageSrc: "../img/story-news/white_chocolate",
    imageAlt: "Photo",
    link: "/news",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    date: "23/07/2020",
  },
];

const MainArticleSection = styled.section`
  margin: 10rem 0;
  text-align: center;

  ${(props) => props.theme.mediaMax.small`
    display: flex;
    justify-content: center;
  `};
`;

const MainArticle = styled.article`
  width: 75%;
  height: inherit;
  display: inline-block;
  position: relative;
  margin: 1rem;
  padding: 1rem;

  ${(props) => props.theme.mediaMax.small`
    display: block;
    padding: 1em;
  `};
`;

const MainArticleDivImg = styled.div`
  width: 65%;
  text-align: start;

  ${(props) => props.theme.mediaMax.small`
    width: 100%;
    text-align: center;
  `};
`;

const MainArticleImg = styled.img`
  width: inherit;
  border-radius: 15px;

  ${(props) => props.theme.mediaMax.small`
    width: 75%;
  `};
`;

const MainArticleContent = styled.div`
  position: absolute;
  background-color: #bab7b4;
  overflow: auto;
  opacity: 0.8;
  top: 70%;
  left: 25%;
  max-block-size: 10rem;
  padding: 1em 2em;

  ${(props) => props.theme.mediaMax.small`
    top: 65%;
    left: auto;
  `};
`;

const NewsSection = styled.section`
  margin: 2rem 0;
  display: flex;
  justify-content: center;

  ${(props) => props.theme.mediaMax.small`
    justify-content: space-evenly;
    align-items: center;
    margin: 0;
  `};
`;

const WrapperNews = styled(FlexDiv)`
  height: inherit;
  width: 90%;

  ${(props) => props.theme.mediaMax.small`
    width: 75%;
  `};
`;

const NewsArticle = styled.article`
  margin: 0.5rem;
  box-shadow: 0 0 1rem black;
  display: flex;
  flex-direction: ${(props) => (props.rowReverse ? "row-reverse" : "row")};
  justify-content: space-around;
  align-content: center;

  ${(props) => props.theme.mediaMax.small`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  `};
`;

const NewsDivImg = styled.div`
  text-align: center;
  padding: 1rem;

  ${(props) => props.theme.mediaMax.small`
    width: auto;
    align-self: center;
    padding: 1em;
  `};
`;

const NewsArticleImg = styled.img`
  width: 50%;
  height: 100%;
`;

const NewsArticleContent = styled(FlexDiv)`
  padding: 1rem;
  text-align: center;
`;

const Home = () => {
  return (
    <>
      <MainArticleSection>
        <MainArticle>
          <MainArticleDivImg>
            <MainArticleImg
              src={require("../img/story-news/story.jpeg")}
              alt="Photo d'un chocolatier"
            />
          </MainArticleDivImg>
          <MainArticleContent>
            <H3>Découvrez l'histoire de notre chocolat !</H3>
            <TextParagraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              officia accusamus repellendus reiciendis cupiditate voluptas nihil
              quam pariatur.
            </TextParagraph>
          </MainArticleContent>
        </MainArticle>
      </MainArticleSection>
      <NewsSection>
        <WrapperNews column around>
          {articles.map((article, i) => {
            if (i % 2 === 0) {
              return (
                <NewsArticle rowReverse>
                  <NewsDivImg>
                    <NewsArticleImg
                      src={require("../img/story-news/white_chocolate")}
                      alt={article.imageAlt}
                    />
                  </NewsDivImg>
                  <NewsArticleContent column center>
                    <header>
                      <H3>
                        <Link to={article.link}>{article.title}</Link>
                      </H3>
                    </header>
                    <TextParagraph>{article.content}</TextParagraph>
                    <TextParagraph>{article.date}</TextParagraph>
                  </NewsArticleContent>
                </NewsArticle>
              );
            } else {
              return (
                <NewsArticle>
                  <NewsDivImg>
                    <NewsArticleImg
                      src={require("../img/story-news/chocolate_bar")}
                      alt={article.imageAlt}
                    />
                  </NewsDivImg>
                  <NewsArticleContent column center>
                    <header>
                      <H3>
                        <Link to={article.link}>{article.title}</Link>
                      </H3>
                    </header>
                    <TextParagraph>{article.content}</TextParagraph>
                    <TextParagraph>{article.date}</TextParagraph>
                  </NewsArticleContent>
                </NewsArticle>
              );
            }
          })}
        </WrapperNews>
      </NewsSection>
    </>
  );
};

export default Home;
