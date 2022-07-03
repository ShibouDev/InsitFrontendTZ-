import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Exit from '../Exit'
import { Formik, Field, Form,} from 'formik'

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #FFCC7E;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Header = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
height: 100px;
a{
    margin-right: 50px;
    font-size:28px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}
`
const AllTask = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 600px;
justify-content: center;
border-radius: 30px;
`
const OneTask = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    background-color: ${props => props.done ? "#6d6d6d" : "#FFCC7E"};
    margin-bottom:2px;
    color: #1F2326;
`
const AddTodo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
`
const Title = styled.div`
    text-align: center;
    color: #1F2326;
`
const FuncClick = styled.div`
    display: flex;
    p{
        padding-left: 20px;
    }
`
const Home = () => {
    const [task, setTask] = useState([])
    const [toggle, setToggle] = useState(true)
    const deleteTask = (index) => {
        const newTask = [...task.slice(0,index), ...task.slice(index + 1)]
        axios.put('/task',
            newTask)
                .then((res)=>{
                    if(res.status === 200){
                        setTask(newTask)
                    }
                })
    }
    const UpdateStatus = (index) => {
        const newTask = [...task]
        newTask[index].status = newTask[index].status === 'open' ? 'done' : 'open'
        axios.post('/task',
        newTask)
        .then((res)=>{
            if(res.status === 200){
                setTask(newTask)
            }
        })
    } 
    useEffect(()=>{
        axios
        .get('/task', {})
            .then((res) => {
                    if(res.status === 200){
                        setTask(res.data)
                }
            })
    }, [])
    return (
        <Wrapper>
            <Header>
                <a href="/home">My Todo</a>
                <a onClick={Exit}>Exit</a>
            </Header>
            <AllTask>
            { task.length !== 0 ? (
            task.map((el, index) => {
                return (
                <OneTask done = {el.status}>
                    { toggle !== index ? (
                <p onDoubleClick={() => {
                setToggle(index)
                }}>{el.description}</p>
                    ) : (
                        <input type="text" 
                        onKeyDown={(e) =>{
                            if(e.key === 'Enter' || e.key === 'Escape'){
                                task[index].description = e.target.value
                            axios.put('/task',task).then((res)=>{ 
                                setTask(task)
                            })
                                setToggle(null)
                            }
                        }}/>
                    )
            }
            <FuncClick>
            <p onClick={() => UpdateStatus(index)}>Выполнено</p>
            <p onClick={() => deleteTask(index)}>X</p>
            </FuncClick>
                </OneTask>  
            )
            })):(<div>No tasks</div>)}
        </AllTask>
            <AddTodo>
            <Formik
            initialValues={{
                description: '',
            }}
            onSubmit={(values,) => {
                const AllTask = [...task, {
                    description: values.description,
                    status: 'open'
                }]
                axios.put('/task',
                AllTask
                            )
                    .then((res)=>{
                        console.log(res)
                        if(res.status === 200){
                            setTask(AllTask)
                        }
                    })
                }}
        render={() => (
            <Form>
                <Title>
                    <p>Add new todo</p>
                </Title>
                <Field
                      name="description"
                      autoComplete="description"
                      placheholder="Enter description"
                      type="description"
                    />
                  <button>Enter</button>
              </Form>
        )}></Formik>
        </AddTodo>
        
        </Wrapper>
    )
}
export default Home