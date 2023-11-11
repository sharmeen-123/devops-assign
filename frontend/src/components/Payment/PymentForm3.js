import {
    Paper,
    Text,
    NumberInput,
    Textarea,
    Button,
    Group,
    SimpleGrid,
    createStyles,
    rem,
    Alert,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileInput, Avatar, Modal } from '@mantine/core';
import React, { useState, useEffect, useContext } from 'react';
import axios from '../../axios';
import { useDisclosure } from '@mantine/hooks';
import { HeaderTabs } from '../header/header';
import { forwardRef } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import "./PaymentForm.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import { ErrorNoti } from '../notification/notificationError';
import Loading from '../Loader/loading';
// import { ContactIconsList } from '../ContactIcons/ContactIcons';
// import bg from './bg.svg';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        wrapper: {
            display: 'flex',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            borderRadius: theme.radius.lg,
            padding: rem(4),
            // margin:"3vw",
            border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
                }`,


            [BREAKPOINT]: {
                flexDirection: 'column',
            },


        },
        main: {
            margin: "1.5%",
            marginLeft: "7%",
            marginRight: "7%"
            // border:"2px solid red"
        },

        form: {
            boxSizing: 'border-box',
            flex: 1,
            padding: theme.spacing.xl,
            paddingLeft: `calc(${theme.spacing.xl} * 2)`,
            borderLeft: 0,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            // border: "2px solid rgb(226, 225, 225)",

            [BREAKPOINT]: {
                padding: theme.spacing.md,
                paddingLeft: theme.spacing.md,
            },
        },

        fields: {
            marginTop: rem(-12),
        },

        fieldInput: {
            flex: 1,

            '& + &': {
                marginLeft: theme.spacing.md,

                [BREAKPOINT]: {
                    marginLeft: 0,
                    marginTop: theme.spacing.md,
                },
            },
        },

        fieldsGroup: {
            display: 'flex',

            [BREAKPOINT]: {
                flexDirection: 'column',
            },
        },

        contacts: {
            boxSizing: 'border-box',
            position: 'relative',
            borderRadius: theme.radius.lg,
            // backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: `${rem(1)} solid transparent`,
            padding: theme.spacing.xl,
            flex: `0 0 ${rem(280)}`,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.sm,
                paddingLeft: theme.spacing.md,
            },
        },

        title: {
            marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.xl,
            },
        },

        control: {
            [BREAKPOINT]: {
                flex: 1,
            },
        },
    };
});

const SelectItem = forwardRef(({ image, label, email, value, ...others }, ref) => (
    <div key={email} data-value={value} {...others}>
        <Group noWrap>
            <Avatar src={image} />

            <div>
                <Text size="sm">{label}</Text>
                <Text size="xs" opacity={0.65}>
                    {email}
                </Text>
            </div>
        </Group>
    </div>
));

export function PaymentForm({ update }) {
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [name, setName] = useState('');
    const [wage, setWage] = useState(0);
    const [hours, setHours] = useState(0);
    const [payment, setPayment] = useState(0);
    const [shifts, setShifts] = useState(0);
    const [id, setId] = useState(false);
    const [email, setEmail] = useState(false);
    const [image, setImage] = useState();
    const [userr, setUserr] = useState([])
    const [img, setImg] = useState(update.image);
    const { alrt, setAlrt } = useContext(AuthContext);
    const { msg, setMsg } = useContext(AuthContext);
    const [isError, setIsError] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();



    const handleValueChange = (value) => {
        setSelectedValue(value);
        handleUserInfo(userr, value)
        // totalHours(selectedValue)
    };
    const Users = async () => {
        try {
            const res = await axios.get('/user/getAllSiteWorkers', {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            const users = res.data.data;
            setUserr(users)
            const newData = users?.map((val) => ({
                label: `${val.firstName} ${val.lastName}`,
                email: val.email,
                value: val._id,
                image: val.image,
            }));
            if (update !== false) {
                let updatedVal;
                if (update.userImage) {
                    updatedVal = {
                        label: update.userName,
                        email: update.email,
                        value: update.userID,
                        image: update.userImage
                    }
                } else {
                    updatedVal = {
                        label: update.userName,
                        email: update.email,
                        value: update.userID
                    }
                }
                newData.unshift(updatedVal)
            }
            setData(newData);
            if (newData.length) {
                setSelectedValue(newData[0].value);
            }
            //  handleUserInfo(users, selectedValue)
            //   totalHours(selectedValue)
        } catch (error) {
            console.log(error);
        }
    };

    const setPaid = async () => {
        let res = await axios.put('/payment/setPaid/' + id,
            {}
            , {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
            .then((res) => {
                console.log("updated")

            }

            )
            .catch((error) => {
                console.log('error occured')
            })
    }

    const payAmount = async () => {
        if(hours == 0 || wage == 0){
            
        setIsAdded(false)
        setMsg("Hours and Wage cannot be Zero")
        setIsError(true)
        console.log("hurs canot be 0")
        }
        else {
            let res = await axios.post('/payment/addpayment',
                { userName: name, userID: id, wage: wage, paidAmount: payment, totalHours: hours, shifts: shifts, userEmail: email, userImage: image }
                , {
                    headers: {
                        authorization: JSON.parse(localStorage.getItem('token'))
                    }
                })
                .then((res) => {
                    console.log('user hours',users.totalHours)
                    if(users.totalHours != 0){
                    setPaid()}
                    setIsAdded(false)
                    setMsg("Amount Paid Successfully!")
                    setImage()
                    setAlrt(true)
                    
                    navigate('/paymentUsers');
                    console.log("paidd")

                }

                )
                .catch((error) => {
                    setIsAdded(false)
                    if (error.response.data) {
                        setMsg(error.response.data)
                    }
                    else {
                        setMsg("Some Error Occured")
                    }
                    setIsError(true)
                })
        }
    }

    const updateAmount = async () => {
        if(hours == 0 || wage == 0){
            
            setIsAdded(false)
            setMsg("Hours and Wage cannot be Zero")
            setIsError(true)
            console.log("hurs canot be 0")
            }
            else  {
            let res = await axios.put('/payment/updatePayment/' + update._id,
                {
                    userID: id, userName: name, wage: wage, paidAmount: payment, totalHours: hours, shifts: shifts,
                    userEmail: email, userImage: image
                },
                {
                    headers: {
                        authorization: JSON.parse(localStorage.getItem('token'))
                    }
                })
                .then((res) => {
                    setMsg("Payment Updated")
                    setImage()
                    setAlrt(true)
                    setIsAdded(false)
                    navigate('/paymentUsers');
                }

                )
                .catch((error) => {
                    setIsAdded(false)
                    if (error.response.data) {
                        setMsg(error.response.data)
                    }
                    else {
                        setMsg("Some Error Occured")
                    }
                    setIsError(true)
                })
        }
    }



    const handleUserInfo = (users, selectedValue) => {
        const user = users.find(person => person._id === selectedValue);
        //   return person ? person.age : null;
        // };
        let nameee = user.firstName + " " + user.lastName
        setName(nameee);
        setId(user._id)
        if (user.image) {
            setImage(user.image)
        }
        setEmail(user.email)
    }

    useEffect(() => {
        const totalPayment = wage * hours;
        setPayment(totalPayment);
    }, [wage, hours]);


    useEffect(() => {
        setAlrt(false);
        setMsg("")
        Users();

        if (update) {
            setPayment(update.totalPayment)
            setHours(update.totalHours)
            setWage(update.wage)
            setName(update.userName);
            setId(update.userID)
            if (update.userImage) {
                setImage(update.userImage)
            }
            setEmail(update.userEmail)
        }

    }, [])

    const form = useForm({

        initialValues: {
            wage: wage,
            hours: hours,
            totalPayment: payment,
            user: "",
        },

    });
    const handleWageChange = (value) => {
        setWage(value);
        setPayment(wage * hours);
    };

    const handleHoursChange = (event) => {
        setHours(event)
        setPayment(wage * hours);
    };

    const handleForm = (user) => {
        setIsAdded(true)
        if (!update) {
            payAmount()
        } else {
            updateAmount()
        }
    }

    useEffect(() => {
        if(!update){
        const fetchTotalHours = async () => {
            if (selectedValue) {
                try {
                    const response = await axios.get('/shifts/getNumberOfHours/' + selectedValue, {
                        headers: {
                            authorization: JSON.parse(localStorage.getItem('token'))
                        }
                    });
                    const data = response.data.data;
                    setUsers(data);
                    setShifts(data.shifts);
                    setHours(data.totalHours);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchTotalHours();}
    }, [selectedValue]);

    useEffect(()=>{
        if(userr.length != 0){
        setSelectedValue(userr[0]._id)
        handleValueChange(userr[0]._id)
        console.log('user is',userr)}
    },[userr])



    return (

        <div>
            <HeaderTabs title={"Add Payment"} />
            {isAdded ? (<>
                <Loading />
            </>) : (<>
                {isError ? (<>
                <ErrorNoti />
            </>) : (<></>)}
            <Paper shadow="md" radius="lg" className={classes.main}>
                <div className={classes.wrapper}>


                    <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
                        <Text fz="lg" fw={700} className={classes.title}>
                            Add Payment
                        </Text>
                        <Select
                            label="Choose employee of the month"
                            placeholder="Pick one"
                            itemComponent={SelectItem}
                            data={data}
                            searchable
                            maxDropdownHeight={400}
                            nothingFound="Nobody here"
                            value={selectedValue}
                            onChange={(event) => handleValueChange(event)}
                            filter={(value, item) =>
                                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                                item.email.toLowerCase().includes(value.toLowerCase().trim())
                            }
                            // {...form.getInputProps('user')} 
                            required

                        />

                        <div className={classes.fields} style={{ marginTop: "2vh" }}>

                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <NumberInput
                                    label="Hours"
                                    id="hours"
                                    value={hours}
                                    // min={1}
                                    onChange={(event) => handleHoursChange(event)}

                                />
                                <NumberInput
                                    label="Wage"
                                    id="wage"
                                    value={wage}
                                    onChange={(event) => handleWageChange(event)}

                                />
                            </SimpleGrid>

                            <NumberInput
                                label="Payment"
                                id="payment"
                                value={payment}
                                required
                            />

                            <Group position="right" mt="md">
                                <Button type="submit" className={`${classes.control} button`} fullWidth
                                    // disabled={isButtonDisabled}
                                    >
                                    Pay
                                </Button>
                            </Group>
                        </div>
                    </form>
                </div>


            </Paper>
            </>)}
            
           
        </div>
    );
}