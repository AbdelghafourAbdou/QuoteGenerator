/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css"

class QuoteGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      renderedQuote: '',
      renderedAuthor: ''
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.randomQuoteNumber = this.randomQuoteNumber.bind(this);
    this.getInitialQuote = this.getInitialQuote.bind(this);
  }

  async getQuotes() {
    try {
      const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      this.setState({
        quotes: data.quotes
      }, () => {
        console.log(this.state);
      });
    } catch (error) {
      console.error('Error fetching information:', error.message);
    }
  }

  randomQuoteNumber() {
    const num = Math.floor(Math.random() * 100 + 0);
    return num;
  }

  getInitialQuote(){
    let randomNumber = this.randomQuoteNumber(); 
    let renderedQuote = this.state.quotes[randomNumber]?.quote || '';
    let renderedAuthor = this.state.quotes[randomNumber]?.author || '';

    this.setState({
      renderedQuote: renderedQuote,
      renderedAuthor: renderedAuthor
    }, () => console.log(this.state))
  }

  async componentDidMount() {
    await this.getQuotes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.quotes !== this.state.quotes) {
      this.getInitialQuote();
    }
  }

  render() {
    return (
      <div id="quote-box">
        <h3 id="text">
          {this.state.renderedQuote}
        </h3>
        <p id="author">- {this.state.renderedAuthor}</p>
        <button id="new-quote" type="button" onClick={this.getInitialQuote}>New Quote</button>
        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${this.state.renderedQuote}`} id="tweet-quote" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>
        </a>
      </div>
    );
  }
}

export default QuoteGen;