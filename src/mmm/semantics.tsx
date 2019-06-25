import React from 'react';
import mmm from './Grammar';
import { Node } from 'ohm-js';

const semantics = mmm.createSemantics();

semantics.addOperation('html', {
  Recipe: (ingredients: Node, steps: Node) => {
    return (<>
      <section className='ingredients'>
        <p>Ingredients.</p>
        <ul>{ingredients.html()}</ul>
      </section>
      <section className='steps'>
        <p>Steps.</p>
        <ol>{steps.html()}</ol>
      </section>
    </>);
  },

  NonemptyListOf: (eFirst: Node, _sep: Node, eRest: Node) =>
    [eFirst.html(), ...eRest.html()],
  EmptyListOf: () => null,
  
  Ingredient: (num: Node, unit: Node, name: Node) =>
    <li>
      {num.sourceString}
      &nbsp;
      {unit.sourceString}
      &nbsp;
      {name.sourceString}
    </li>,
  Step: (num: Node, _dot: Node, description: Node) =>
    <li>
      {/* {num.sourceString} */}
      &nbsp;
      {description.sourceString}
    </li>,
});

export default semantics;
