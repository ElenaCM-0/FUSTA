const Course = ({course}) => {

    return (
      <div>
        <Header course = {course.name} />
        <Content parts = {course.parts} />
        <p> <b>Number of exercises {course.parts.reduce((total, cur_element) => 
                                                            total + cur_element.exercises
                                                        , 0)}</b></p>
      </div>
    )
    
}

const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => 
                        <Part key = {part.id} name={part.name} exercises = {part.exercises}/>
            )
      }
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

export default Course