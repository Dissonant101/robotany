import requests
import cohere

input = {
    'text': 'John went to the mall. Can you increase the moisture of Raha, my plant?',
    'categories': [
        'Update on plant',
        'Get status',
        'Water plant',
        'Increase moisture',
        'Get basic info',
        'Unknown'
    ]
}

res = requests.post(url='http://0.0.0.0:3000/categorize', json=input)
print(res.json())

# Paste your API key here. Remember to not share publicly
api_key = 'xe7ybPghnwKjETBI3ow62GfmwwPU6mXcTDIA2Z59'

# Create and retrieve a Cohere API key from os.cohere.ai
co = cohere.Client(api_key)

name_examples = [
("Jerry", "Can you give me a water status update on Jerry?"),
("none", "Water all my plants."),
("Steven", "How is my plant Steven doing?"),
("Waleed", "Water Waleed please."),
("Hack the North", "Did I over water Hack the North?"),
("Bento", "Is Bento too hot in the sun?"),
]

#@title Create the prompt (Run this cell to execute required code) {display-mode: "form"}

class cohereExtractor():
    def __init__(self, examples, example_labels, labels, task_desciption, example_prompt):
        self.examples = examples
        self.example_labels = example_labels
        self.labels = labels
        self.task_desciption = task_desciption
        self.example_prompt = example_prompt

    def make_prompt(self, example):
        examples = self.examples + [example]
        labels = self.example_labels + [""]
        return (self.task_desciption +
                "\n---\n".join( [examples[i] + "\n" +
                                self.example_prompt + 
                                 labels[i] for i in range(len(examples))]))

    def extract(self, example):
      extraction = co.generate(
          model='command-nightly',
          prompt=self.make_prompt(example),
          max_tokens=15,
          temperature=0.5,
          stop_sequences=["\n"])
      return(extraction.generations[0].text)


cohereNameExtractor = cohereExtractor([e[1] for e in name_examples], [e[0] for e in name_examples], [], "", "extract the name from the command or question:")
print(cohereNameExtractor.make_prompt(input.get("text")))

try:
    extracted_text = cohereNameExtractor.extract(input.get("text"))
    print(extracted_text)
except Exception as e:
    print('ERROR: ', e)