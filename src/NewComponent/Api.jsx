import React, { useState, useEffect } from 'react'
import './Api.css'

function Api() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [select, setSelect] = useState();
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/currency', {
            method: 'GET'
        }
        )
            .then((response) => response.json())
            .then((get) => {
                console.log(get);
                setCountries(get.data);
                setFilteredCountries(get.data)
            })
            .catch((error) => {
                console.log(error);
                alert();
            })
    }, [])
    const showFlag = (country) => {
        fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "iso2": country.iso2 }
            )
        }
        ).then((response) => response.json())
            .then((get) => {
                setSelect(get?.data)
            })
    }
    const searchCountry = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = countries.filter((country) => country.name.toLowerCase().includes(searchTerm));
        setFilteredCountries(filtered);
    }
    return (
        <>
            <div className='container'>
                <input type="text" placeholder='search country' className='search-cnty' onChange={searchCountry} />
                {filteredCountries.map((element, index) => <div onClick={() => showFlag(element)} className='cnty' key={index}>{element.name} </div>)}
            </div>

            {select?.flag && <div className='flag-show'>
                <button className='close-btn' onClick={() => setSelect({})}>x</button>
                <img src={select?.flag} alt="" height={'300px'} />
              <h3 className='country-name'> {select.name}</h3>

            </div>
            }

        </>
    )
}

export default Api