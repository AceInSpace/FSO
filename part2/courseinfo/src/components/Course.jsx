const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
      <Parts parts={parts} />
      </>
    )
  }
  
  const Parts = ({parts}) => {
    return (
      parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    )
  }
  
  const Total = ({parts}) => {
    const total = 
      parts.reduce(
      (accumulator, {exercises}) => accumulator + exercises, 0)
  
    return (
      <p>
      <b>Total of {total} exercises</b>
      </p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }

export default Course