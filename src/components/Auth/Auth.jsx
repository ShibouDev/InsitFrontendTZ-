import styled, {keyframes} from 'styled-components'
// import Link from 'next/link'
import { Formik, Field, Form } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';

const AddContactSchema = Yup.object().shape({
  username: Yup.string()
    .required('Введите email'),
});
const FadeUp = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #FFCC7E;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`
const Tt = styled.div`
input{
  border-radius: 5px;
  width: 150px;
  height: 25px;
  border: none;
}
`

const Title = styled.div`
  color: #fff;
  font-size: 64px;
  font-weight: bold;
  animation-name: ${FadeUp};
  animation-duration: 2s;
`
const AuthForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 22px;
  animation-name: ${FadeUp};
  animation-duration: 4s;
  Form{
    margin-top:10px;
    display: flex;
    width: 250px;
    align-items: center;
  }
  button{
    background-color: #1F2326;
    color: #fff;
    border:none;
    width: 150px;
    height: 25px;
    margin-left: 20px;
    border-radius: 5px;
  }
`
export const Auth = () => {
  return (
    <Wrapper>
      <Title>
        <p>Insit Todo List</p>
      </Title>
          <Formik
            initialValues={{
              username: '',
            }}
            validationSchema={AddContactSchema}
            onSubmit={(values, { setErrors, resetForm: any }) => {
              const headers = {
                'Content-Type': 'application/json',
              }
              axios
                .post(
                  `/login`,
                  {
                    username: values.username,
                  },
                  {
                    headers
                  }
                )
                .then((res) => {
                  if (res.status === 200) {
                    window.location.href="/home"
                  }
                })
                .catch((err) => {
                })
            }}
            render={({ values, errors }) => (
              <AuthForm>
                <p>Enter your username</p>
              <Form>
                <Tt>
                <Field
                      name="username"
                      autoComplete="username"
                      placheholder="Enter username"
                      type="username"
                    />
                </Tt>
                  <button>Enter</button>
              </Form>
            </AuthForm>
            )}
          ></Formik>
        </Wrapper>
  )
}
export default Auth