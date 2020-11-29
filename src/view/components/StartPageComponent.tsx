import * as React from 'react'
import { TitleComponent } from './shared/TitleComponent'
import { css } from 'emotion'
import { useHistory } from 'react-router-dom'
import { InputComponent } from './shared/InputComponent'
import { ButtonComponent } from './shared/ButtonComponent'
import { colors } from '../constants/Colors'
import { PageComponent } from './shared/PageComponent'
import { connect } from 'react-redux'
import { setUserDataAction } from '../../data/actionCreators'
import { IUser } from '../../models/IUser'

interface IStartPageComponentProps {
    setUserData: (userDate: IUser) => void
}

const previewVideoCss = css`
    margin-bottom: 18px;
    flex-grow: 1;
    border-radius: 11px;
    overflow: hidden;

    > * {
        width: 100%;
        height: 100%;
    }
`

const startPageCss = css`
    padding: 15px 42px 12px 42px;
`

const inputsWrapperCss = css``

const startBtnCss = css`
    margin-top: 24px;
`

const termsCss = css`
    font-size: 10px;
    color: ${colors.infoColor};
    text-align: center;
    padding-top: 15px;

    a {
        font-weight: 700;
        text-decoration: underline;
    }
`

export const StartPage: React.FC<IStartPageComponentProps> = ({ setUserData }) => {
    const [userName, setUserName] = React.useState<string>('')
    const [userAge, setUserAge] = React.useState<number | null>(null)
    const [errorMessages, setErrorMessages] = React.useState<{ [fieldName: string]: string }>({})
    const history = useHistory()

    const onUserNameChangeHandler = React.useCallback(({ target: { value } }: any): void => {
        setUserName(value)
    }, [])

    const onUserAgeChangeHandler = React.useCallback(({ target: { value } }: any): void => {
        setUserAge(value)
    }, [])

    const onStartSubmitHandler = React.useCallback(
        (e): void => {
            e.preventDefault()

            if (!userName) {
                setErrorMessages((errorMessages) => ({
                    ...errorMessages,
                    name: 'Name field is required',
                }))
            }

            if (!userAge) {
                setErrorMessages((errorMessages) => ({
                    ...errorMessages,
                    age: 'Age field is required',
                }))
            }

            if (userName && userAge) {
                setUserData({
                    name: userName.trim(),
                    age: parseInt(`${userAge}`),
                })

                history.push('/accesses')
            }
        },
        [userName, userAge]
    )

    return (
        <PageComponent className={startPageCss}>
            <TitleComponent>Create your day with us!</TitleComponent>

            <div className={previewVideoCss}>
                <iframe
                    src="https://www.youtube.com/embed/S2nBBMbjS8w"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className={inputsWrapperCss}>
                <InputComponent
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={onUserNameChangeHandler}
                    errorMessage={errorMessages.name}
                />
                <InputComponent
                    type="number"
                    placeholder="Age"
                    value={userAge || undefined}
                    onChange={onUserAgeChangeHandler}
                    errorMessage={errorMessages.age}
                />

                <ButtonComponent
                    type="submit"
                    onClick={onStartSubmitHandler}
                    className={startBtnCss}
                    dark
                    fullBleed
                    data-testid="start-button"
                >
                    Start
                </ButtonComponent>
            </div>

            <div className={termsCss}>
                <p>
                    by continuing, you agree to Brand Lens’s <a href="#">Terms of Use</a>
                </p>
                <p>
                    ans confirm that you have read Brand Lens’s <a href="#">Privacy Policy</a>
                </p>
            </div>
        </PageComponent>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setUserData: (userDate) => dispatch(setUserDataAction(userDate)),
})

export const StartPageComponent = connect(null, mapDispatchToProps)(StartPage)
