// Your code goes here
const root = document.getElementById('root');
let sets = [];
window.onhashchange = function() {
  const hash = location.hash;
  const modifyPageRegex = /#\/modify\/(\d+)/;
  if (hash === '#/add') {
    removeChildrenOf(root);
    loadSetPage('Add new set', { name: '', terms: [] }, set => {
      const savedSets = fetchSetsFromStorage();
      const ZERO = 0;
      const newSetId = savedSets.length
        ? Math.max(...savedSets.map(set => set.id)) + 1
        : ZERO;
      set.id = newSetId;
      addNewSet(set);
    });
  } else if (modifyPageRegex.test(hash)) {
    const setId = parseInt(hash.match(modifyPageRegex)[1]);
    const set = sets.find(element => element.id === setId);
    removeChildrenOf(root);
    loadSetPage('Modify set', set, saveSets);
  } else if (hash === '') {
    removeChildrenOf(root);
    loadMainPage();
  }
};

// custom classes
class Tag {
  constructor(tag, attribute) {
    this.node = document.createElement(tag);
    if (attribute) {
      if (attribute.startsWith('.')) {
        this.node.setAttribute('class', attribute.substring(1));
      } else if (attribute.startsWith('#')) {
        this.node.setAttribute('id', attribute.substring(1));
      }
    }
  }
  addChildren(...children) {
    children.forEach(child => {
      this.node.appendChild(child.node);
    });
    return this;
  }
  addText(text) {
    this.node.appendChild(document.createTextNode(text));
    return this;
  }
  addEventListener(...args) {
    this.node.addEventListener(...args);
    return this;
  }
  addClass(className) {
    this.node.classList.add(className);
  }
}

class Div extends Tag {
  constructor(attribute) {
    super('div', attribute);
  }
}

class Button extends Tag {
  constructor(title, attribute) {
    super('button', attribute);
    super.addText(title);
  }
}

class H1 extends Tag {
  constructor(title) {
    super('h1');
    super.addText(title);
  }
}

class Input extends Tag {
  constructor(placeholder, value = '') {
    super('input');
    this.node.setAttribute('placeholder', placeholder);
    this.node.setAttribute('value', value);
  }
}

class TermSet {
  constructor(set) {
    this.set = set;
    this.name = set.name;
    this.node = new Div('.termSet')
      .addEventListener('click', () => {
        this.set.studied = !this.set.studied;
        saveSets();
        refreshSets();
      })
      .addChildren(
        new Div().addText(set.name),
        new Button('Edit').addEventListener('click', function(event) {
          event.stopPropagation();
          location.hash = `#/modify/${set.id}/`;
        }),
        new Button('Remove').addEventListener('click', () => {
          event.stopPropagation();
          const removingElementIndex = sets.findIndex(set => set === this.set);
          sets.splice(removingElementIndex, 1);
          saveSets();
          refreshSets();
        })
      );
    if (this.set.studied) {
      this.node.addClass('studied');
    }
  }
}

// main logic
loadMainPage();

function loadMainPage() {
  const container = new Div('.container').addChildren(
    new H1('Main page'),
    new Button('Add new set', '.new-set').addEventListener('click', function() {
      location.hash = '#/add';
    }),
    new Div('#sets')
  );
  root.appendChild(container.node);
  refreshSets();
}

function loadSetPage(pageTitle, set, saveCallback) {
  const saveButton = new Button('Save changes').addEventListener(
    'click',
    function() {
      if (!set.name.length) {
        alert('Set must have name');
        return;
      }
      for (const term of set.terms) {
        if (!term.term.trim().length && !term.definition.trim().length) {
          alert('Each term element must have term and definition');
          return;
        }
      }
      saveCallback(set);
      location.hash = '#';
    }
  );
  const termsDiv = new Div('#terms');
  const container = new Div('.container').addChildren(
    new H1(pageTitle),
    new Input('Name', set.name).addEventListener('input', function(event) {
      set.name = event.target.value.trim();
    }),
    new Button('Add term').addEventListener('click', function() {
      set.terms.push({ term: '', definition: '' });
      updateTermsList();
    }),
    saveButton,
    new Button('Cancel').addEventListener('click', function() {
      location.hash = '#';
    }),
    termsDiv
  );
  root.appendChild(container.node);
  updateTermsList();

  function updateTermsList() {
    removeChildrenOf(termsDiv.node);
    termsDiv.addChildren(
      ...set.terms.map(term =>
        new Div('.term').addChildren(
          new Input('Term', term.term).addEventListener('input', function(
            event
          ) {
            const value = event.target.value;
            term.term = value;
          }),
          new Input('Definition', term.definition).addEventListener(
            'input',
            function(event) {
              const value = event.target.value;
              term.definition = value;
            }
          ),
          new Button('Remove').addEventListener('click', function() {
            set.terms = set.terms.filter(element => term !== element);
            updateTermsList();
          })
        )
      )
    );
  }
}

function addNewSet(set) {
  sets.push(set);
  saveSets();
}

function saveSets() {
  localStorage.setItem('sets', JSON.stringify(sets));
}

function refreshSets() {
  sets = fetchSetsFromStorage();
  const setsNode = document.getElementById('sets');
  removeChildrenOf(setsNode);
  sets
    .concat()
    .sort((a, b) => {
      let result;
      if (Boolean(a.studied) === Boolean(b.studied)) {
        result = b.id - a.id;
      } else {
        const MINUS_ONE = -1;
        result = a.studied ? 1 : MINUS_ONE;
      }
      return result;
    })
    .forEach(set => {
      setsNode.appendChild(new TermSet(set).node.node);
    });
}

function fetchSetsFromStorage() {
  const setsJson = localStorage.getItem('sets') || '[]';
  return JSON.parse(setsJson);
}

function removeChildrenOf(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
