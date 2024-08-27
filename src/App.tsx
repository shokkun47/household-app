import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firerbase';
import { formatMonth } from './utils/formatting';
import { Scheme } from './validations/schema';

function App() {

  // Firebaseエラーかどうかを判定する型ガード
  function isFireStoreError(err: unknown): err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // firestoreのデータをすべて取得
  useEffect(() => {
    const fetchTransactions = async() => {
      try { 
        const querySnapshot = await getDocs(collection(db, "Transactions"))

        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData)
      } catch(err) {
        if (isFireStoreError(err)) {
          console.error("firestoresのエラーは:",err);
        } else {
          console.error("一般的なエラーは:",err);
        }
        // error
      }  
    }
    fetchTransactions();
  }, [])

  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Scheme) => {
    try {
      // firestoreに保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      
      setTransactions((prevTransaction) => [
        ...prevTransaction, 
        newTransaction,
      ]);
    } catch(err) {
      if (isFireStoreError(err)) {
        console.error("firestoresのエラーは:",err);
      } else {
        console.error("一般的なエラーは:",err);
      }
    }
  };

    // firebaseのデータを削除
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      // firestoreのデータを削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      const fiteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      setTransactions(fiteredTransactions);
    } catch(err) {
      if (isFireStoreError(err)) {
        console.error("firestoresのエラーは:",err);
      } else {
        console.error("一般的なエラーは:",err);
      }
    }
  }

  // firebaseの更新処理
  const handleUpdateTransaction = async (
    transaction: Scheme,
    transactionId: string,
  ) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);

      const updatedTransactions = transactions.map((t) => 
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch(err) {
      if (isFireStoreError(err)) {
        console.error("firestoresのエラーは:",err);
      } else {
        console.error("一般的なエラーは:",err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route
              index
              element={
                <Home 
                  monthlyTransactions={monthlyTransactions} 
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/report"
              element={
                <Report 
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                />
              } 
            />
            <Route path="*" element={<NoMatch />}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
