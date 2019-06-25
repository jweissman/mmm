import React, { ReactNode } from 'react';
import './RecipeMaker.scss';
import mmm from '../mmm/Grammar';
import semantics from '../mmm/semantics';

type State = {
  recipeText: string,
  recipeTitle: string,
  errorMessage: string,
  matched: boolean,
  recipeHtml: ReactNode
}
class RecipeMaker extends React.Component<{}, State> {
  state = {
    recipeText: '',
    recipeTitle: '',
    recipeHtml: <><p>(render recipe here)</p></>,
    matched: false,
    errorMessage: ''
  }

  componentWillMount() {
    this.handleUpdate("2/3 of a tomato\n1. do something\n2. do another thing")
  }

  handleTitleChange = (e: any) => {
    this.setState({ recipeTitle: e.target.value })
  }

  handleUpdate = (newText: string) => {
    let theMatch = mmm.match(newText);
    let matched = theMatch.succeeded();
    let recipeHtml = this.state.recipeHtml;
    let errorMessage = '';
    if (matched) {
      recipeHtml = semantics(theMatch).html()
    } else {
      errorMessage = theMatch.message ? theMatch.message : '';
    }
    this.setState({
      recipeText: newText,
      matched,
      recipeHtml,
      errorMessage,
    })
  }

  render() {
    return (<>
      <h2>Add Recipe</h2>
      <div className='RecipeMaker'>
        <section className='Recipe-input'>
          <p>We will gather your recipe details below, starting with ingredients and then a numbered list of steps. (See more about mmmlang here...)</p>
          <label>
            <p>First, what should we call the recipe?</p>
            <input
              type='text'
              name='title'
              onChange={this.handleTitleChange}
              value={this.state.recipeTitle}
            />
          </label>
          <label>
            <p>
              <u>Okay.</u> <b>Please enter</b> your awesome recipe here...
            </p>
            <textarea
              placeholder={`
              10 whole tomatoes
              3 pints vinegar

              1. Slice the tomatoes
              2. Mix them together with vinegar
            `}
              id='recipe'
              style={{ width: '400px', height: '200px' }}
              onChange={(e) => this.handleUpdate(e.target.value)}
              value={this.state.recipeText}
            />
            <p>{this.state.matched ? "matched" : "didn't match"}</p>
            <pre>{this.state.errorMessage}</pre>
          </label>
        </section>
        <section className='Recipe-preview'>
          <h1>{this.state.recipeTitle}</h1>
          {this.state.recipeHtml}
        </section>
      </div>
    </>);
  }
}

export default RecipeMaker;
