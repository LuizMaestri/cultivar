import React, { Fragment } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Header from './Header';
import formatter from '../../../../utils/formatter';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    subTitle: {
        marginBottom: 10,
        fontSize: 20,
        marginTop: 10
    },
    volunteer: {
        flexDirection: 'row',
        fontFamily: 'Lato Bold',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    event: {
        fontStyle: 'italic',
        flexDirection: 'column'
    },
    rating: {
        flexDirection: 'row',
        marginBottom: 10
    }
});

const Title = ({ cpf, name }) => (
    <View style={styles.volunteer}>
        <Text>{formatter.cpf(cpf)}</Text>
        <Text> - {name}</Text>
    </View>
);

export default ({data}) =>{
    let report = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (!report[element.cnpj]) {
                report[element.cnpj] = {
                    company: element. company
                };
            }
            if (!report[element.cnpj].volunteers) {
                report[element.cnpj].volunteers = {};
            }
            if (!report[element.cnpj].volunteers[element.cpf]) {
                report[element.cnpj].volunteers[element.cpf] = {
                    name: element.user,
                };
            }
            if (element.project) {
                if (!report[element.cnpj].volunteers[element.cpf].projects) {
                    report[element.cnpj].volunteers[element.cpf].projects = {};
                }
                if (!report[element.cnpj].volunteers[element.cpf].projects[element.project]) {
                    report[element.cnpj].volunteers[element.cpf].projects[element.project] = {
                        ratings: []
                    };
                }
                report[element.cnpj].volunteers[element.cpf].projects[element.project].ratings.push(element.rating);
            } else {
                if (!report[element.cnpj].volunteers[element.cpf].events) {
                    report[element.cnpj].volunteers[element.cpf].events = {};
                }
                const { event: eventDetails } = element;
                const eventName = eventDetails.type.name + ' - ' + new Date(eventDetails.startOccurrence).toLocaleString()
                report[element.cnpj].volunteers[element.cpf].events[eventName] = {
                    rating: element.rating
                };
            }

        }
    }
    console.log(report);
    return (
        <Document>
            {
                Object.keys(report).map(
                    key => (
                        <Page size="A4">
                            <View style={styles.container}>
                                <Header>{formatter.cnpj(key)} - {report[key].company}</Header>
                                {
                                    Object.keys(report[key].volunteers).map(
                                        key2 =>
                                            <Fragment>
                                                <Title cpf={key2} name={report[key].volunteers[key2].name}/>
                                                <View style={styles.container}>
                                                    <Text style={styles.subTitle}>Projetos</Text>
                                                    {
                                                        (report[key].volunteers[key2].projects && Object.keys(report[key].volunteers[key2].projects).length) ?
                                                            Object.keys(report[key].volunteers[key2].projects).map(
                                                                key3 => (
                                                                    <Fragment>
                                                                        <View style={styles.event}>
                                                                            <Text>{key3}</Text>
                                                                        </View>
                                                                        <View style={styles.container}>
                                                                            {
                                                                                report[key].volunteers[key2].projects[key3].ratings.map(
                                                                                    rating => (
                                                                                        <View style={styles.rating}>
                                                                                            <Text>Avaliação - {rating.grade}</Text>
                                                                                            <Text>&nbsp;&nbsp;-&nbsp;&nbsp;</Text>
                                                                                            <Text>{rating.comment}</Text>
                                                                                        </View>
                                                                                    )
                                                                                )
                                                                            }
                                                                        </View>
                                                                    </Fragment>
                                                                )
                                                            ) : (
                                                                <Text>O Voluntário ainda não foi avaliado em nenhum projeto da CnE</Text>
                                                            )
                                                    }
                                                </View>
                                                <View style={styles.container}>
                                                    <Text style={styles.subTitle}>Eventos</Text>

                                                    {
                                                        (report[key].volunteers[key2].events && Object.keys(report[key].volunteers[key2].events).length) ?
                                                            Object.keys(report[key].volunteers[key2].events).map(
                                                                key3 => (
                                                                    <Fragment>
                                                                        <View style={styles.event}>
                                                                            <Text>{key3}</Text>
                                                                        </View>
                                                                        <View style={styles.rating}>
                                                                            <Text>Avaliação - {report[key].volunteers[key2].events[key3].rating.grade}</Text>
                                                                            <Text>&nbsp;&nbsp;-&nbsp;&nbsp;</Text>
                                                                            <Text>{report[key].volunteers[key2].events[key3].rating.comment}</Text>
                                                                        </View>
                                                                    </Fragment>
                                                                )
                                                            ) : (
                                                                <Text>O Voluntário ainda não foi avaliado em nenhum evento da CnE</Text>
                                                            )
                                                    }
                                                </View>
                                            </Fragment>
                                    )
                                }
                            </View>
                        </Page>
                    )
                )
            }
        </Document>
    );
}