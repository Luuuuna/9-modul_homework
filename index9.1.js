const parser = new DOMParser ();

const xmlString =`
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDom = parser.parseFromString(xmlString, 'text/xml');
const student = xmlDom.querySelectorAll('student');
const result = {
  list: []
};

for(let i = 0; i < student.length; i++) {
  const nameFist = student[i].querySelector('first');
  const nameSecond = student[i].querySelector('second');
  const ageStudent = student[i].querySelector('age');
  const profStudent = student[i].querySelector('prof');
  const lang = student[i].querySelector('name').getAttribute('lang');

  const studentInfo = {
  name: nameFist.textContent + ' ' + nameSecond.textContent,
  age: ageStudent.textContent,
  prof: profStudent.textContent,
  lang: lang
 
  };
  
  result.list.push(studentInfo);
  
}
console.log(result);